import * as authly from "authly"
import * as gracely from "gracely"
import * as model from "@payfunc/model"
import * as api from "./api"

async function preauth(key: authly.Token, merchant: model.Merchant.Key, request: api.preauth.Request, token: authly.Token): Promise<api.preauth.Response | api.Error | gracely.Error> {
	return (!merchant.card || merchant.card.emv3d?.protocol != "ch3d2") ? gracely.client.unauthorized() : api.preauth.post({ url: merchant.card.url, key }, request, token)
}

async function auth(merchant: model.Merchant.Key, request: api.auth.Request): Promise<api.auth.Response | api.Error | gracely.Error> {
	return (!merchant.card || merchant.card.emv3d?.protocol != "ch3d2") ? gracely.client.unauthorized() : api.auth.post({ url: merchant.card.emv3d.url, key: merchant.card.emv3d.key }, request)
}

async function postauth(merchant: model.Merchant.Key, request: api.postauth.Request): Promise<api.postauth.Response | api.Error | gracely.Error> {
	return (!merchant.card || merchant.card.emv3d?.protocol != "ch3d2") ? gracely.client.unauthorized() : api.postauth.post({ url: merchant.card.emv3d.url, key: merchant.card.emv3d.key }, request)
}

export {
	api,
	preauth,
	auth,
	postauth,
}
