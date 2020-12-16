import { Response } from "./Response"

describe("challenge.Response", () => {
	it("is challenge.Response", () => {
		const challengeResponse: Response = {
			acsTransID: "example",
			challengeCompletionInd: "Y",
			messageType: "CRes",
			messageVersion: "2.1.0",
			messageExtension: [
				{
					criticalityIndicator: false,
					data: {
						json: true,
					},
					id: "abcdefgh",
					name: "example",
				},
				{
					criticalityIndicator: true,
					data: {
						example: {
							is: true,
						},
					},
					id: "12345678",
					name: "example",
				},
			],
			threeDSServerTransID: "abcd1234",
			transStatus: "Y",
		}
		expect(Response.is(challengeResponse))
	})
})
