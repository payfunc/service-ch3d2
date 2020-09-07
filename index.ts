import { default as fetch } from "node-fetch"
import * as authly from "authly"
import * as gracely from "gracely"
import * as model from "@payfunc/model"
import * as card from "@cardfunc/model"
import * as api from "./api"

async function preauth(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	token: authly.Token
): Promise<api.preauth.Response | api.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.preauth.post({ url: merchant.card.url, key }, token)
}

async function auth(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	request: api.auth.Request,
	token: authly.Token
): Promise<api.auth.Response | api.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.auth.post({ url: merchant.card.url, key }, request, token)
}

async function postauth(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	request: api.postauth.Request,
	token: authly.Token
): Promise<api.postauth.Response | api.Error | gracely.Error> {
	return !merchant.card
		? gracely.client.unauthorized()
		: api.postauth.post({ url: merchant.card.url, key }, request, token)
}

export { api, preauth, auth, postauth }

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
		let result: model.PaymentVerifier.Response | gracely.Error
		const merchant =
			(await model.Merchant.Key.KeyInfo.unpack(key, "public")) ??
			(await model.Merchant.Key.KeyInfo.unpack(key, "private"))
		if (!merchant)
			result = gracely.client.unauthorized()
		else {
			let token: authly.Token | gracely.Error | undefined =
				request.payment.type == "account"
					? request.payment.token
					: request.payment.type == "card"
					? request.payment.account ?? request.payment.card ?? request.payment.reference
					: undefined
			if (!token)
				result = gracely.client.malformedContent(
					"request.payment.card | request.payment.account",
					"model.Card.Token | model.Account.",
					"not a card or account token"
				)
			else {
				const method =
					request.payment.type == "card" && request.payment.account
						? await model.Account.Method.Card.Creatable.verify(request.payment.account)
						: undefined
				if (method)
					token = method.card ?? method.reference
				if (
					request.reference.type == "account" &&
					((await card.Card.Token.verify(token))?.type == "single use" || (await card.Account.verify(token)))
				)
					token = await accountToCardToken(key, merchant as model.Merchant.Key.KeyInfo, token)
				if (gracely.Error.is(token))
					result = token
				else {
					const cardToken = await card.Card.Token.verify(token)
					if (!cardToken)
						result = gracely.client.malformedContent(
							"request.payment.card | request.payment.account",
							"model.Card.Token | model.Account.",
							"not a card or account token"
						)
					else {
						if (!cardToken.verification) {
							const preauthResponse = await preauth(key, merchant, token)
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
								result = model.PaymentVerifier.Response.verificationRequired(
									false,
									"GET",
									preauthResponse.threeDSMethodURL,
									{
										type: "method",
										threeDSServerTransID: preauthResponse.threeDSServerTransID,
									}
								)
							} else {
								result = model.PaymentVerifier.Response.unverified()
							}
						} else if (cardToken.verification.type == "method") {
							if (typeof cardToken.verification.data != "object") {
								result = gracely.client.invalidContent(
									"Card.Verification",
									"description",
									"Method verification data corrupt"
								)
								if (logFunction)
									logFunction("ch3d2.verify", "error", { token, response: result })
							} else {
								const authRequest: api.auth.Request = {
									deviceChannel: "02", // "02": Browser channel
									messageCategory: model.Item.amount(request.items) > 0 ? "01" : "02", // "01": Payment, "02": Non-Payment
									messageType: "AReq",
									messageVersion: "2.1.0",
									threeDSRequestorURL: "https://payfunc.com/about/contact/",
									threeDSServerTransID: cardToken.verification.data.threeDSServerTransID,
								}
								const authResponse = await auth(key, merchant, authRequest, token)
								if (logFunction)
									logFunction("ch3d2.preauth", "trace", { token, response: authResponse })
								// TODO
								result = gracely.server.backendFailure("ch3d2.verify auth response handling not implemented.")
							}
						} else if (cardToken.verification.type == "challenge") {
							if (typeof cardToken.verification.data != "object") {
								result = gracely.client.invalidContent(
									"Card.Verification",
									"description",
									"Method verification data corrupt"
								)
								if (logFunction)
									logFunction("ch3d2.verify", "error", { token, response: result })
							} else {
								const postauthRequest: api.postauth.Request = {
									threeDSServerTransID: cardToken.verification.data.transaction,
								}
								const postauthResponse = await postauth(key, merchant, postauthRequest, token)
								if (logFunction)
									logFunction("ch3d2.preauth", "trace", { token, response: postauthResponse })
								// TODO
								result = gracely.server.backendFailure("ch3d2.verify postauth response handling not implemented.")
							}
						} else {
							result = gracely.server.backendFailure("ch3d2.verify undefined behaviour.")
						}
					}
				}
			}
		}
		return !gracely.Error.is(result) ? result : model.PaymentVerifier.Response.error(result)
	}
}

export async function accountToCardToken(
	key: authly.Token,
	merchant: model.Merchant.Key.KeyInfo,
	previous: authly.Token
): Promise<authly.Token | gracely.Error> {
	let result: authly.Token | gracely.Error
	if (!merchant.card)
		result = gracely.client.unauthorized()
	else if (!card.Card.Token.verify(previous) && !card.Account.verify(previous))
		result = gracely.client.invalidContent(
			"token",
			"authly.Token",
			'Need a valid card token or an old account token to sign a new "recurring" card Token.'
		)
	else {
		const accountTokenResponse = await fetch(merchant.card.url + "/card/" + previous + "/account", {
			method: "GET",
			headers: { authorization: `Bearer ${key}`, "content-type": "application/json; charset=utf-8" },
		})
		let accountTokenResponseBody
		switch (accountTokenResponse.headers.get("content-type")) {
			case "application/jwt; charset=utf-8":
				result = await accountTokenResponse.text()
				break
			case "application/json; charset=utf-8":
				accountTokenResponseBody = await accountTokenResponse.json()
				result = gracely.Error.is(accountTokenResponseBody)
					? accountTokenResponseBody
					: gracely.client.invalidContent("token", "authly.Token")
				break
			default:
				result = gracely.server.backendFailure("Unexpected answer from CardFunc.")
				break
		}
	}
	return result
}
