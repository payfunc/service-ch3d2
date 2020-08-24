import { Date } from "./Date"

export interface AcctInfo {
	chAccAgeInd?: "01" | "02" | "03" | "04" | "05"
	chAccChange?: Date
	chAccChangeInd?: "01" | "02" | "03" | "04"
	chAccDate?: Date
	chAccPwChange?: Date
	chAccPwChangeInd?: "01" | "02" | "03" | "04" | "05"
	nbPurchaseAccount?: string
	paymentAccAge?: Date
	paymentAccInd?: "01" | "02" | "03" | "04" | "05"
	provisionAttemptsDay?: Date
	shipAddressUsage?: Date
	shipAddressUsageInd?: "01" | "02" | "03" | "04"
	shipNameIndicator?: "01" | "02"
	suspiciousAccActivity?: "01" | "02"
	txnActivityDay?: string
	txnActivityYear?: string
}
function range02is(value: any) {
	return value == "01" || value == "02"
}
function range04is(value: string) {
	return value == "01" || value == "02" || value == "03" || value == "04"
}
function range05is(value: string) {
	return value == "01" || value == "02" || value == "03" || value == "04" || value == "05"
}
export namespace AcctInfo {
	export function is(value: AcctInfo | any): value is AcctInfo {
		return (
			typeof value == "object" &&
			(value.chAccAgeInd == undefined || range05is(value.chAccAgeInd)) &&
			(value.chAccChange == undefined || Date.is(value.chAccChange)) &&
			(value.chAccChangeInd == undefined || range04is(value.chAccChangeInd)) &&
			(value.chAccDate == undefined || Date.is(value.chAccDate)) &&
			(value.chAccPwChange == undefined || Date.is(value.chAccPwChange)) &&
			(value.chAccPwChangeInd == undefined || range05is(value.chAccPwChangeInd)) &&
			(value.nbPurchaseAccount == undefined ||
				(typeof value.nbPurchaseAccount == "string" &&
					value.nbPurchaseAccount.length <= 4 &&
					/^[0-9]{1,4}$/.test(value.nbPurchaseAccount))) &&
			(value.paymentAccAge == undefined || Date.is(value.paymentAccAge)) &&
			(value.paymentAccInd == undefined || range05is(value.paymentAccInd)) &&
			(value.provisionAttemptsDay == undefined || Date.is(value.provisionAttemptsDay)) &&
			(value.shipAddressUsage == undefined || Date.is(value.shipAddressUsage)) &&
			(value.shipAddressUsageInd == undefined || range04is(value.shipAddressUsageInd)) &&
			(value.shipNameIndicator == undefined || range02is(value.shipNameIndicator)) &&
			(value.suspiciousAccActivity == undefined || range02is(value.suspiciousAccActivity)) &&
			(value.txnActivityDay == undefined ||
				(typeof value.txnActivityDay == "string" &&
					value.txnActivityDay.length <= 3 &&
					/^[0-9]{1,3}$/.test(value.txnActivityDay))) &&
			(value.txnActivityYear == undefined ||
				(typeof value.txnActivityYear == "string" &&
					value.txnActivityYear.length <= 3 &&
					/^[0-9]{1,3}$/.test(value.txnActivityYear)))
		)
	}
}
