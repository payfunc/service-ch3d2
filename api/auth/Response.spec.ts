import { Response } from "./Response"

describe("service.ch3d2.api.auth.Response", () => {
	const minimalResponse = {
		acsTransID: "dummy-id",
		dsReferenceNumber: "dummy-id",
		dsTransID: "dummy-id",
		messageType: "ARes",
		messageVersion: "2.1.0",
		sdkTransID: "dummy-id",
		threeDSServerTransID: "dummy-id",
	}
	it("is minimal response", () => expect(Response.is(minimalResponse)).toBeTruthy())
	const maximalResponse = {
		acsChallengeMandated: "Y",
		acsOperatorID: "dummy-id",
		acsReferenceNumber: "dummy-id",
		acsRenderingType: { acsInterface: "01", acsUiTemplate: "01" },
		acsSignedContent: "dummy-encrypted-string",
		acsTransID: "dummy-id",
		acsURL: "https://www.example.com/",
		authenticationType: "02",
		authenticationValue: "1234567890123456789012345678",
		cardholderInfo:
			"Additional authentication is needed for this transaction, please contact (Issuer Name) at xxx-xxx-xxxx.",
		dsReferenceNumber: "dummy-id",
		dsTransID: "dummy-id",
		eci: "??",
		messageExtension: [{ criticalityIndicator: false, data: 0x1234, id: "dummy-id", name: "dummy-name" }],
		messageType: "ARes",
		messageVersion: "2.1.0",
		sdkTransID: "dummy-id",
		threeDSServerTransID: "dummy-id",
		transStatus: "C",
		transStatusReason: "19",
	}
	it("is maximal response", () => expect(Response.is(maximalResponse)).toBeTruthy())
	const sandboxResponse = {
		acsOperatorID: "3dsecureio-standin-acs",
		acsReferenceNumber: "3dsecureio-standin-acs",
		acsTransID: "951bda3d-1404-47d7-afb3-4ce5d40f2869",
		authenticationValue: "L98l99NIRrKy6Bx8N3l6G6eS5uo=",
		dsReferenceNumber: "3dsecureio-standin-ds",
		dsTransID: "1c7c4427-c311-4780-b5f3-a3435d14c5b9",
		eci: "05",
		messageType: "ARes",
		messageVersion: "2.1.0",
		threeDSServerTransID: "a1e5c26f-a40e-4b7d-9f8c-e0a18bf22698",
		transStatus: "Y",
	}
	it("sandbox response is", () => expect(Response.is(sandboxResponse)).toBeTruthy())
})
