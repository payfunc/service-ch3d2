import { Response } from "./Response"

describe("service.ch3d2.api.preauth.Response", () => {
	it("is preauth response with all properties set", () => {
		const response = {
			acsEndProtocolVersion: "2.2.0",
			acsInfoInd: ["01", "02", "03", "04", "80", "81", "99"],
			acsStartProtocolVersion: "2.1.0",
			dsEndProtocolVersion: "2.2.0",
			dsStartProtocolVersion: "2.1.0",
			endRange: "4111111111111111",
			startRange: "4100000000000000",
			threeDSMethodURL:
				"https://www.example.com/alongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurlisalongurl/butnotlongerthanthisurl",
			threeDSServerTransID: "01234567-89ab-cdef-0123-456789abcdef",
		}
		expect(Response.is(response)).toBeTruthy()
	})
	it("is preauth response with only required properties set", () => {
		const response = {
			acsEndProtocolVersion: "2.2.0",
			acsStartProtocolVersion: "2.1.0",
			endRange: "4111111111111111",
			startRange: "4100000000000000",
			threeDSServerTransID: "01234567-89ab-cdef-0123-456789abcdef",
		}
		expect(Response.is(response)).toBeTruthy()
	})
})
