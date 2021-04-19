import * as gracely from "gracely"
import * as authly from "authly"
import * as model from "@payfunc/model"
import * as api from "./api"

async function preauth(
	key: authly.Token,
	merchant: model.Key,
	token: authly.Token,
	id: authly.Identifier
): Promise<api.preauth.Response | api.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.preauth.post({ url: merchant.card.url, key }, token, id)
}

async function auth(
	key: authly.Token,
	merchant: model.Key,
	request: api.auth.Request,
	token: authly.Token
): Promise<api.auth.Response | api.Error | gracely.Error> {
	return !merchant.card ? gracely.client.unauthorized() : api.auth.post({ url: merchant.card.url, key }, request, token)
}

async function postauth(
	key: authly.Token,
	merchant: model.Key,
	request: api.postauth.Request,
	token: authly.Token
): Promise<api.postauth.Response | api.Error | gracely.Error> {
	return !merchant.card
		? gracely.client.unauthorized()
		: api.postauth.post({ url: merchant.card.url, key }, request, token)
}

export { api, preauth, auth, postauth }
