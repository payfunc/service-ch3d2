import { MethodResult } from "./MethodResult"
import { Response as PreAuthorizationResponse } from "./preauth/Response"

describe("service.ch3d2.api.MethodResult", () => {
	const upgradedCompleted: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.2.0",
		threeDSCompInd: "Y",
	}
	const upgradedFailed: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.2.0",
		threeDSCompInd: "N",
	}
	const upgradedNoUrl: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.2.0",
		threeDSCompInd: "U",
	}
	const completed: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.1.0",
		threeDSCompInd: "Y",
	}
	const failed: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.1.0",
		threeDSCompInd: "N",
	}
	const noUrl: MethodResult = {
		threeDSServerTransID: "12345678-abcd-ab12-12345678",
		messageVersion: "2.1.0",
		threeDSCompInd: "U",
	}
	it("MethodResult from noUrl #1", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.1.0",
				acsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
			})
		).toEqual(noUrl))
	it("MethodResult from noUrl #2", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.1.0",
				acsEndProtocolVersion: "2.2.0",
				dsStartProtocolVersion: "2.1.0",
				dsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
			})
		).toEqual(noUrl))
	it("MethodResult from upgrade nuUrl #1", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.2.0",
				acsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
			})
		).toEqual(upgradedNoUrl))
	it("MethodResult from upgrade noUrl #2", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.1.0",
				acsEndProtocolVersion: "2.2.0",
				dsStartProtocolVersion: "2.2.0",
				dsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
			})
		).toEqual(upgradedNoUrl))
	it("MethodResult from upgraded completed #1", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.1.0",
				acsEndProtocolVersion: "2.2.0",
				dsStartProtocolVersion: "2.2.0",
				dsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
				threeDSMethodURL: "http://example.com/method",
			})
		).toEqual(upgradedCompleted))
	it("MethodResult from upgraded completed #2", () =>
		expect(
			MethodResult.from(
				{
					threeDSServerTransID: "12345678-abcd-ab12-12345678",
					acsStartProtocolVersion: "2.1.0",
					acsEndProtocolVersion: "2.2.0",
					dsStartProtocolVersion: "2.2.0",
					dsEndProtocolVersion: "2.2.0",
					startRange: "1234123412340000",
					endRange: "1234123412341234",
					threeDSMethodURL: "http://example.com/method",
				},
				"performed"
			)
		).toEqual(upgradedCompleted))
	it("MethodResult from failed completed #2", () =>
		expect(
			MethodResult.from(
				{
					threeDSServerTransID: "12345678-abcd-ab12-12345678",
					acsStartProtocolVersion: "2.1.0",
					acsEndProtocolVersion: "2.2.0",
					dsStartProtocolVersion: "2.2.0",
					dsEndProtocolVersion: "2.2.0",
					startRange: "1234123412340000",
					endRange: "1234123412341234",
					threeDSMethodURL: "http://example.com/method",
				},
				"failed"
			)
		).toEqual(upgradedFailed))
	it("MethodResult from completed #1", () =>
		expect(
			MethodResult.from({
				threeDSServerTransID: "12345678-abcd-ab12-12345678",
				acsStartProtocolVersion: "2.1.0",
				acsEndProtocolVersion: "2.2.0",
				dsStartProtocolVersion: "2.1.0",
				dsEndProtocolVersion: "2.2.0",
				startRange: "1234123412340000",
				endRange: "1234123412341234",
				threeDSMethodURL: "http://example.com/method",
			})
		).toEqual(completed))
	it("MethodResult from failed #1", () =>
		expect(
			MethodResult.from(
				{
					threeDSServerTransID: "12345678-abcd-ab12-12345678",
					acsStartProtocolVersion: "2.1.0",
					acsEndProtocolVersion: "2.2.0",
					dsStartProtocolVersion: "2.1.0",
					dsEndProtocolVersion: "2.2.0",
					startRange: "1234123412340000",
					endRange: "1234123412341234",
					threeDSMethodURL: "http://example.com/method",
				},
				"failed"
			)
		).toEqual(failed))
})
