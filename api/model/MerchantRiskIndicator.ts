import { Currency } from "./Currency"
import { Date } from "./Date"

export interface MerchantRiskIndicator {
	deliveryEmailAddress?: string
	deliveryTimeframe?: "01" | "02" | "03" | "04"
	giftCardAmount?: string
	giftCardCount?: string
	giftCardCurr?: Currency
	preOrderDate?: Date
	preOrderPurchaseInd: "01" | "02"
	reorderItemsInd: "01" | "02"
	shipIndicator?: "01" | "02" | "03" | "04" | "05" | "06" | "07"
}

// tslint:disable-next-line: no-namespace
export namespace MerchantRiskIndicator {
	export function is(value: MerchantRiskIndicator | any): value is MerchantRiskIndicator {
		return typeof value == "object" &&
			(value.deliveryEmailAddress == undefined || typeof value.deliveryEmailAddress == "string" && value.deliveryEmailAddress.length <= 254 && /\S+@\S+/.test(value.deliveryEmailAddress)) && // Very rough filter, denying only very obvious non email-adresses.
			(value.deliveryTimeframe == undefined || value.deliveryTimeframe == "01" || value.deliveryTimeframe == "02" || value.deliveryTimeframe == "03" || value.deliveryTimeframe == "04") &&
			(value.giftCardAmount == undefined || typeof value.giftCardAmount == "string" && /^\d{0,15}$/.test(value.giftCardAmount)) &&
			(value.giftCardCount == undefined || typeof value.giftCardCount == "string" && /^\d{2}$/.test(value.giftCardCount)) &&
			(value.giftCardCurr == undefined || Currency.is(value.giftCardCurr)) &&
			(value.preOrderDate == undefined || Date.is(value.preOrderDate)) &&
			(value.preOrderPurchaseInd == undefined || value.preOrderPurchaseInd == "01" || value.preOrderPurchaseInd == "02") &&
			(value.reorderItemsInd == undefined || value.reorderItemsInd == "01" || value.reorderItemsInd == "02") &&
			(value.shipIndicator == undefined || value.shipIndicator == "01" || value.shipIndicator == "02" || value.shipIndicator == "03" || value.shipIndicator == "04" || value.shipIndicator == "05" || value.shipIndicator == "06" || value.shipIndicator == "07")
	}
}
