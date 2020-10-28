import { default as fetch } from "node-fetch"
import * as authly from "authly"
import * as isoly from "isoly"
import * as gracely from "gracely"
import * as model from "@payfunc/model"
import * as card from "@cardfunc/model"
import * as api from "./api"
import * as ch3d2 from "./index"

export class Verifier extends model.PaymentVerifier {
	public constructor() {
		super()
	}

	public async verify(
		key: authly.Token,
		request: model.PaymentVerifier.Request,
		force?: boolean,
		logFunction?: (step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void
	): Promise<model.PaymentVerifier.Response> {
		let result: model.PaymentVerifier.Response | gracely.Error | string | undefined
		const merchant = await model.Key.unpack(key, "public", "private")
		if (!merchant)
			result = gracely.client.unauthorized()
		else {
			const token: authly.Token | undefined =
				request.payment.type == "account"
					? request.payment.token
					: request.payment.type == "card"
					? request.payment.card
					: undefined
			const cardToken = token ? await card.Card.Token.verify(token) : undefined
			if (!token || !cardToken)
				result = gracely.client.malformedContent("request.payment.card", "model.Card.Token", "not a card token")
			else {
				let threeDSServerTransID: string | undefined
				if (!cardToken.verification && force)
					result = await this.preauth(key, merchant, token, logFunction)
				if ((threeDSServerTransID = this.getVerificationId("method", cardToken, force, result)))
					result = await this.auth(key, merchant, token, cardToken, logFunction, request, threeDSServerTransID)
				else if ((threeDSServerTransID = this.getVerificationId("challenge", cardToken, force, result)))
					result = await this.postauth(key, merchant, token, logFunction, threeDSServerTransID)
				else if (typeof result == "string")
					result = gracely.server.backendFailure("result as string unhandled: ", result)
				else if (!result)
					result = model.PaymentVerifier.Response.unverified()
			}
		}
		return !gracely.Error.is(result) ? result : model.PaymentVerifier.Response.error(result)
	}
	private getVerificationId(
		type: "method" | "challenge",
		cardToken: card.Card.Token,
		force: boolean | undefined,
		result: model.PaymentVerifier.Response | gracely.Error | string | undefined
	) {
		return cardToken.verification?.type == type && typeof cardToken.verification.data == "object" && !force
			? cardToken.verification.data.threeDSServerTransID
			: typeof result == "string" && ((type == "method" && force) || (type == "challenge" && !force))
			? result
			: undefined
	}

	private async postauth(
		key: authly.Token,
		merchant: model.Key,
		token: string,
		logFunction:
			| ((step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void)
			| undefined,
		threeDSServerTransID: string
	) {
		let result: model.PaymentVerifier.Response | gracely.Error
		const postauthRequest: api.postauth.Request = {
			threeDSServerTransID,
		}
		const postauthResponse = await ch3d2.postauth(key, merchant, postauthRequest, token)
		if (logFunction)
			logFunction("ch3d2.postauth", "trace", { token, response: postauthResponse })
		if (gracely.Error.is(postauthResponse))
			result = postauthResponse
		else if (api.Error.is(postauthResponse))
			result = gracely.server.backendFailure(
				"ch3d2.verify postauth responsed with error code:",
				postauthResponse.errorCode
			)
		else if (api.postauth.Response.is(postauthResponse))
			result =
				postauthResponse.transStatus == "Y" || postauthResponse.transStatus == "A"
					? model.PaymentVerifier.Response.verified()
					: (result = gracely.client.malformedContent("Card.Token", "string", "3D Secure Failed."))
		else
			result = gracely.server.backendFailure("ch3d2.verify postauth failed with unknown error")
		return result
	}

	private async auth(
		key: string,
		merchant: model.Key,
		token: string,
		cardToken: card.Card.Token,
		logFunction:
			| ((step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void)
			| undefined,
		request: model.PaymentVerifier.Request,
		threeDSServerTransID: string
	) {
		let result: model.PaymentVerifier.Response | gracely.Error
		const paymentType: "card" | "account" | "create account" =
			request.payment.type == "account" && model.Item.amount(request.items) == 0
				? "create account"
				: cardToken.type == "recurring"
				? "account"
				: "card"
		let authRequest: api.auth.Request = {
			deviceChannel: "02",
			messageCategory: paymentType != "create account" ? "01" : "02",
			messageType: "AReq",
			messageVersion: "2.1.0",
			threeDSRequestorURL: "https://payfunc.com/about/contact/",
			threeDSServerTransID,
			threeDSRequestorAuthenticationInd:
				paymentType == "account"
					? "02" // Recurring transaction
					: paymentType == "create account"
					? "04" // Add card
					: "01", // Payment transaction
			threeDSCompInd: "Y",
			transType: "01",
		}
		if (paymentType != "create account") {
			const decimals = isoly.Currency.decimalDigits(request.currency) ?? 0
			const amount = Math.round(
				model.Item.amount(request.payment.type == "card" ? request.payment.amount ?? request.items : request.items) *
					10 ** decimals
			)
			authRequest.purchaseAmount = amount.toString()
			authRequest.purchaseCurrency = isoly.CurrencyCode.from(request.currency)
			authRequest.purchaseExponent = decimals.toString()
			authRequest.purchaseDate = ch3d2.api.model.PreciseTime.from(isoly.DateTime.now())
			if (paymentType == "card" && authRequest.deviceChannel != "03")
				authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge as auth is only run when additional verification is required.
		} else
			authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge when creating an account.
		authRequest = this.appendCustomerData(request.customer, authRequest)
		const authResponse = await ch3d2.auth(key, merchant, authRequest, token)
		if (logFunction)
			logFunction("ch3d2.auth", "trace", { token, response: authResponse })
		if (gracely.Error.is(authResponse))
			result = authResponse
		else if (api.Error.is(authResponse))
			result = gracely.server.backendFailure("ch3d2.verify auth responsed with error code:", authResponse.errorCode)
		else if (api.auth.Response.is(authResponse))
			result =
				authResponse.transStatus == "Y" || authResponse.transStatus == "A"
					? model.PaymentVerifier.Response.verified()
					: authResponse.transStatus == "C"
					? model.PaymentVerifier.Response.verificationRequired(true, "POST", authResponse.acsURL ?? "", {
							type: "challenge",
							threeDSServerTransID: authResponse.threeDSServerTransID,
							acsTransID: authResponse.acsTransID,
							messageVersion: authResponse.messageVersion,
							messageType: "CReq",
							challengeWindowSize: "01",
					  })
					: (result = gracely.client.malformedContent("Card.Token", "string", "3D Secure Failed."))
		else
			result = gracely.server.backendFailure("ch3d2.verify auth failed with unknown error")
		return result
	}

	private appendCustomerData(customer: model.Customer | undefined, authRequest: api.auth.Request) {
		if (customer) {
			if (customer.address)
				authRequest = { ...authRequest, ...ch3d2.api.convert.convertAddress(customer.address) }
			if (customer.email) {
				const email = model.EmailAddresses.get(customer.email, "primary", "billing")
				if (email)
					authRequest.email = email
			}
			if (customer.phone) {
				authRequest = { ...authRequest, ...ch3d2.api.convert.convertPhone(customer.phone) }
			}
		}
		return authRequest
	}

	private async preauth(
		key: string,
		merchant: model.Key,
		token: string,
		logFunction:
			| ((step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void)
			| undefined
	) {
		let result: model.PaymentVerifier.Response | string | gracely.Error
		const preauthResponse = await ch3d2.preauth(key, merchant, token)
		if (logFunction)
			logFunction("ch3d2.preauth", "trace", { token, response: preauthResponse })
		if (api.Error.is(preauthResponse))
			result =
				preauthResponse.errorCode == "305"
					? gracely.client.malformedContent("card.pan", "string", "Not enrolled.")
					: gracely.server.backendFailure("Unhandled backend error.")
		else if (gracely.Error.is(preauthResponse))
			result = preauthResponse
		else if (preauthResponse.threeDSMethodURL) {
			result = model.PaymentVerifier.Response.verificationRequired(false, "POST", preauthResponse.threeDSMethodURL, {
				type: "method",
				threeDSServerTransID: preauthResponse.threeDSServerTransID,
			})
		} else {
			result = preauthResponse.threeDSServerTransID
		}
		return result
	}
}
