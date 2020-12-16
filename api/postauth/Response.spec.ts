import { Response } from "./Response"

jest.setTimeout(10000)
describe("service.ch3d2.api.auth.Response", () => {
	it("is app response", () => {
		expect(
			Response.is({
				acsRenderingType: { acsInterface: "01", acsUiTemplate: "01" },
				acsTransID: "dummy-id",
				authenticationType: "02",
				authenticationValue: "1234567890123456789012345678",
				challengeCancel: "01",
				dsTransID: "dummy-id",
				eci: "??",
				interactionCounter: "03",
				messageCategory: "02",
				messageExtension: [{ criticalityIndicator: false, data: {}, id: "dummy-id", name: "dummy-name" }],
				messageType: "RReq",
				messageVersion: "2.1.0",
				threeDSServerTransID: "dummy-id",
				transStatus: "U",
				transStatusReason: "01",
			})
		).toBeTruthy()
	})
	it("is browser response", () => {
		expect(
			Response.is({
				acsTransID: "dummy-id",
				authenticationType: "02",
				authenticationValue: "1234567890123456789012345678",
				challengeCancel: "04",
				dsTransID: "dummy-id",
				eci: "??",
				interactionCounter: "05",
				messageCategory: "02",
				messageExtension: [
					{ criticalityIndicator: false, data: { example: "yes" }, id: "dummy-id", name: "dummy-name" },
				],
				messageType: "RReq",
				messageVersion: "2.1.0",
				threeDSServerTransID: "dummy-id",
				transStatus: "U",
				transStatusReason: "01",
			})
		).toBeTruthy()
	})
	it.skip("is 3RI response", () => {
		expect(
			Response.is({
				acsTransID: "dummy-id",
				authenticationType: "02",
				authenticationValue: "1234567890123456789012345678",
				dsTransID: "dummy-id",
				eci: "??",
				messageCategory: "02",
				messageExtension: [{ criticalityIndicator: false, data: { example: 123 }, id: "dummy-id", name: "dummy-name" }],
				messageType: "RReq",
				messageVersion: "2.1.0",
				threeDSServerTransID: "dummy-id",
				transStatus: "C",
				transStatusReason: "19",
			})
		).toBeTruthy()
	})
})
