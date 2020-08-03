import * as ch3d2 from "./index"

describe("service-ch3d2", () => {
	it("test accessibility or (minimum of one test is required)", () => {
		ch3d2.api.preauth.Request.is({})
		ch3d2.api.auth.Request.limit({})
		ch3d2.api.preauth.Response.is({})
		ch3d2.api.postauth.Request.is({})
		const ch3d2CallFunctions = [ch3d2.preauth, ch3d2.auth, ch3d2.postauth]
		ch3d2.api.model.Currency.is("752")
		ch3d2.api.Error.is({})
	})
})
