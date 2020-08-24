import { AcctInfo } from "./AcctInfo"

describe("service.ch3d2.api.model.AcctInfo is", () => {
	const data = {
		chAccAgeInd: "05",
		chAccChange: "20200229",
		chAccChangeInd: "04",
		chAccDate: "20200229",
		chAccPwChange: "20200229",
		chAccPwChangeInd: "05",
		nbPurchaseAccount: "9999",
		paymentAccAge: "20200229",
		paymentAccInd: "05",
		provisionAttemptsDay: "20200229",
		shipAddressUsage: "20200229",
		shipAddressUsageInd: "04",
		shipNameIndicator: "02",
		suspiciousAccActivity: "02",
		txnActivityDay: "999",
		txnActivityYear: "999",
	}
	it("service.ch3d2.api.model.AcctInfo is", () => expect(AcctInfo.is(data)).toBeTruthy())
	it("service.ch3d2.api.model.AcctInfo is not #1", () =>
		expect(AcctInfo.is({ ...data, chAccAgeInd: "06" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #2", () =>
		expect(AcctInfo.is({ ...data, chAccChange: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #3", () =>
		expect(AcctInfo.is({ ...data, chAccChangeInd: "05" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #4", () =>
		expect(AcctInfo.is({ ...data, chAccDate: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #5", () =>
		expect(AcctInfo.is({ ...data, chAccPwChange: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #6", () =>
		expect(AcctInfo.is({ ...data, chAccPwChangeInd: "06" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #7", () =>
		expect(AcctInfo.is({ ...data, nbPurchaseAccount: "10000" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #8", () =>
		expect(AcctInfo.is({ ...data, paymentAccAge: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #9", () =>
		expect(AcctInfo.is({ ...data, paymentAccInd: "06" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #10", () =>
		expect(AcctInfo.is({ ...data, provisionAttemptsDay: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #11", () =>
		expect(AcctInfo.is({ ...data, shipAddressUsage: "20200230" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #12", () =>
		expect(AcctInfo.is({ ...data, shipAddressUsageInd: "05" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #13", () =>
		expect(AcctInfo.is({ ...data, shipNameIndicator: "03" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #14", () =>
		expect(AcctInfo.is({ ...data, suspiciousAccActivity: "03" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #15", () =>
		expect(AcctInfo.is({ ...data, txnActivityDay: "1000" })).toBeFalsy())
	it("service.ch3d2.api.model.AcctInfo is not #16", () =>
		expect(AcctInfo.is({ ...data, txnActivityYear: "1000" })).toBeFalsy())
})
