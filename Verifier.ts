import * as gracely from "gracely"
import * as authly from "authly"
import * as card from "@payfunc/model-card"
import * as model from "@payfunc/model"
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
		const merchant = await model.Key.unpack(key)
		if (!merchant || !merchant.card)
			result = gracely.client.unauthorized()
		else {
			const token: authly.Token | undefined =
				request.payment.type == "account"
					? request.payment.token
					: request.payment.type == "card"
					? request.payment.card
					: undefined
			const cardToken = token
				? (await card.Card.Token.verify(token)) ?? (await card.Card.V1.Token.verify(token))
				: undefined
			if (!token || !cardToken)
				result = gracely.client.malformedContent(
					"request.payment.card",
					"model.Card.Token | model.Card.V1.Token",
					"not a card token"
				)
			else {
				let transactionId: string | undefined
				if (!cardToken.verification && force)
					result = await this.preauthenticate(key, merchant, token, logFunction)
				if ((transactionId = this.getVerificationId("method", cardToken, force, result)))
					result = await this.authenticate(
						key,
						merchant as model.Key & { card: card.Merchant.Card },
						{ ...cardToken, token },
						request.reference.type == "account" ? "create account" : request.reference.account ? "account" : "card",
						logFunction,
						request,
						transactionId
					)
				else if ((transactionId = this.getVerificationId("challenge", cardToken, force, result)))
					result = await this.postauthenticate(key, merchant, token, logFunction, transactionId)
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
		token: card.Card.Token | card.Card.V1.Token,
		force: boolean | undefined,
		result: model.PaymentVerifier.Response | gracely.Error | string | undefined
	) {
		return token.verification?.type == type && typeof token.verification.data == "object" && !force
			? token.verification.data.threeDSServerTransID
			: typeof result == "string" && ((type == "method" && force) || (type == "challenge" && !force))
			? result
			: undefined
	}

	private async postauthenticate(
		key: authly.Token,
		merchant: model.Key,
		token: string,
		logFunction:
			| ((step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void)
			| undefined,
		transactionId: string
	): Promise<model.PaymentVerifier.Response | gracely.Error> {
		let result: model.PaymentVerifier.Response | gracely.Error
		const request: api.postauth.Request = {
			threeDSServerTransID: transactionId,
		}
		const response = await ch3d2.postauth(key, merchant, request, token)
		if (logFunction)
			logFunction("ch3d2.postauth", "trace", { token, response: response })
		if (gracely.Error.is(response))
			result = response
		else if (api.Error.is(response))
			result = gracely.server.backendFailure("ch3d2.verify postauth responsed with error code:", response.errorCode)
		else if (api.postauth.Response.is(response))
			result =
				response.transStatus == "Y" || response.transStatus == "A"
					? model.PaymentVerifier.Response.verified(response.payfunc?.token)
					: (result = gracely.client.malformedContent("Card.Token", "string", "3D Secure Failed."))
		else
			result = gracely.server.backendFailure("ch3d2.verify postauth failed with unknown error")
		return result
	}

	private async authenticate(
		key: string,
		merchant: model.Key & { card: card.Merchant.Card },
		cardToken: (card.Card.Token | card.Card.V1.Token) & { token: authly.Token },
		paymentType: "card" | "account" | "create account",
		logFunction:
			| ((step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void)
			| undefined,
		request: model.PaymentVerifier.Request,
		transactionId: string
	) {
		let result: model.PaymentVerifier.Response | gracely.Error
		const parent =
			(request.payment.type == "card" &&
				model.Payment.Card.Creatable.is(request.payment) &&
				request.payment.client?.browser &&
				request.payment.client.browser.parent) ||
			""
		const response = await ch3d2.auth(
			key,
			merchant,
			api.auth.Request.generate(
				card.Card.Token.is(cardToken)
					? card.Card.Token.getVerificationTarget(cardToken, merchant.card.url, parent)
					: merchant.card.url +
							"/card/" +
							cardToken.card +
							"/verification?mode=iframe&merchant=" +
							(merchant.card.id ?? merchant.sub) +
							"&parent=" +
							encodeURIComponent(parent),
				transactionId,
				model.Item.amount(request.payment.type == "card" ? request.payment.amount ?? request.items : request.items),
				request.currency,
				paymentType
			),
			cardToken.token
		)
		if (logFunction)
			logFunction("ch3d2.auth", "trace", { token: cardToken.token, response: response })
		if (gracely.Error.is(response))
			result = response
		else if (api.Error.is(response))
			result = gracely.server.backendFailure("ch3d2.verify auth responsed with error code:", response.errorCode)
		else if (api.auth.Response.is(response))
			result =
				response.transStatus == "Y" || response.transStatus == "A"
					? model.PaymentVerifier.Response.verified(response.payfunc?.token)
					: response.transStatus == "C"
					? model.PaymentVerifier.Response.verificationRequired(true, "POST", response.acsURL ?? "", {
							type: "challenge",
							threeDSServerTransID: response.threeDSServerTransID,
							acsTransID: response.acsTransID,
							messageVersion: response.messageVersion,
							messageType: "CReq",
							challengeWindowSize: "01",
					  })
					: (result = gracely.client.malformedContent("Card.Token", "string", "3D Secure Failed."))
		else
			result = gracely.server.backendFailure("ch3d2.verify auth failed with unknown error")
		return result
	}

	private async preauthenticate(
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
