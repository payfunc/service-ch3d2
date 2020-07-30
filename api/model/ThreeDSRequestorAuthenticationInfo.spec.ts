import { ThreeDSRequestorAuthenticationInfo } from "./ThreeDSRequestorAuthenticationInfo"

describe("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is", () => {
	it("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is #1", () => expect(ThreeDSRequestorAuthenticationInfo.is({ threeDSReqAuthData: "abcd"	})).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is #2", () => expect(ThreeDSRequestorAuthenticationInfo.is({ threeDSReqAuthMethod: "01"	})).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is #3", () => expect(ThreeDSRequestorAuthenticationInfo.is({ threeDSReqAuthTimestamp: "202012312359" })).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is #4", () => expect(ThreeDSRequestorAuthenticationInfo.is({ threeDSReqAuthData: "abcd", threeDSReqAuthMethod: "06", threeDSReqAuthTimestamp: "202012312359" })).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorAuthenticationInfo is not #1", () => expect(ThreeDSRequestorAuthenticationInfo.is({ threeDSReqAuthData: "abcd", threeDSReqAuthMethod: "07", threeDSReqAuthTimestamp: "202012312359" })).toBeFalsy())
})
