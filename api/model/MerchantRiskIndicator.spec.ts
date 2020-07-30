import { MerchantRiskIndicator } from "./MerchantRiskIndicator"

describe("service.ch3d2.api.model.MerchantRiskIndicator is", () => {
	const data = {
		deliveryEmailAddress: "test@mail.com",
		deliveryTimeframe: "04",
		giftCardAmount: "0",
		giftCardCount: "00",
		giftCardCurr: "752",
		preOrderDate: "20201231",
		preOrderPurchaseInd: "02",
		reorderItemsInd: "02",
		shipIndicator: "07",
	}
	it("service.ch3d2.api.model.MerchantRiskIndicator is", () => expect(MerchantRiskIndicator.is(data)).toBeTruthy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #1", () => expect(MerchantRiskIndicator.is({ ...data, deliveryEmailAddress: "test.mail.com" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #2", () => expect(MerchantRiskIndicator.is({ ...data, deliveryTimeframe: "05" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #3", () => expect(MerchantRiskIndicator.is({ ...data, giftCardAmount: "1234567890234567890" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #4", () => expect(MerchantRiskIndicator.is({ ...data, giftCardCount: "0" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #5", () => expect(MerchantRiskIndicator.is({ ...data, giftCardCurr: "999" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #6", () => expect(MerchantRiskIndicator.is({ ...data, preOrderDate: "20201299" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #7", () => expect(MerchantRiskIndicator.is({ ...data, preOrderPurchaseInd: "03" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #8", () => expect(MerchantRiskIndicator.is({ ...data, reorderItemsInd: "03" })).toBeFalsy())
	it("service.ch3d2.api.model.MerchantRiskIndicator is not #9", () => expect(MerchantRiskIndicator.is({ ...data, shipIndicator: "0" })).toBeFalsy())
})
