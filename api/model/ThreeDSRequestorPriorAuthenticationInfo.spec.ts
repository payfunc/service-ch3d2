import { ThreeDSRequestorPriorAuthenticationInfo } from "./ThreeDSRequestorPriorAuthenticationInfo"

describe("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is", () => {
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is #1", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthData: "abcd"	})).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is #2", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthMethod: "01"	})).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is #3", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthTimestamp: "202012312359" })).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is #4", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorRef: "xyz" })).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is #5", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthData: "abcd", threeDSReqPriorAuthMethod: "04", threeDSReqPriorAuthTimestamp: "202012312359", threeDSReqPriorRef: "xyz" })).toBeTruthy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is not #1", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthData: "abcd", threeDSReqPriorAuthMethod: "05", threeDSReqPriorAuthTimestamp: "202012312359", threeDSReqPriorRef: "xyz" })).toBeFalsy())
	it("service.ch3d2.api.model.ThreeDSRequestorPriorAuthenticationInfo is not #2", () => expect(ThreeDSRequestorPriorAuthenticationInfo.is({ threeDSReqPriorAuthData: "abcd", threeDSReqPriorRef: "123456789012345678901234567890toolong!" })).toBeFalsy())
})
