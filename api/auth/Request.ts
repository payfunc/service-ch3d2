import * as gracely from "gracely"
import * as isoly from "isoly"
import { isIPv4, isIPv6 } from "net"
import { AcctInfo } from "../model/AcctInfo"
import { DeviceRenderOptions } from "../model/DeviceRenderOptions"
import { PhoneNumber } from "../model/PhoneNumber"
import { MerchantRiskIndicator } from "../model/MerchantRiskIndicator"
import { MessageExtension } from "../model/MessageExtension"
import { Currency } from "../model/Currency"
import { Date } from "../model/Date"
import { ShortDate } from "../model/ShortDate"
import { PreciseTime } from "../model/PreciseTime"
import { ThreeDSRequestorAuthenticationInfo } from "../model/ThreeDSRequestorAuthenticationInfo"
import { ThreeDSRequestorPriorAuthenticationInfo } from "../model/ThreeDSRequestorPriorAuthenticationInfo"
import * as api from "../index"

export interface Request {
	acctID?: string
	acctInfo?: AcctInfo
	// acctNumber: string // May be a card number, added by Cardfunc
	acctType?: string
	acquirerBIN?: string
	acquirerMerchantID?: string
	addrMatch?: "Y" | "N"
	billAddrCity?: string
	billAddrCountry?: string
	billAddrLine1?: string
	billAddrLine2?: string
	billAddrLine3?: string
	billAddrPostCode?: string
	billAddrState?: string
	browserAcceptHeader?: string
	browserColorDepth?: "1" | "4" | "8" | "15" | "16" | "24" | "32" | "48"
	browserIP?: string
	browserJavaEnabled?: boolean
	browserLanguage?: string
	browserScreenHeight?: string
	browserScreenWidth?: string
	browserTZ?: string
	browserUserAgent?: string
	cardExpiryDate?: ShortDate
	cardholderName?: string
	deviceChannel: "01" | "02" | "03"
	deviceRenderOptions?: DeviceRenderOptions
	email?: string
	homePhone?: PhoneNumber
	mcc?: string
	merchantCountryCode?: string
	merchantName?: string
	merchantRiskIndicator?: MerchantRiskIndicator
	messageCategory: "01" | "02"
	messageExtension?: MessageExtension[]
	messageType: "AReq"
	messageVersion: "2.1.0" | "2.2.0"
	mobilePhone?: PhoneNumber
	notificationURL?: string
	purchaseAmount?: string
	purchaseCurrency?: Currency
	purchaseDate?: PreciseTime
	purchaseExponent?: string
	purchaseInstalData?: string
	payTokenInd?: true
	recurringExpiry?: Date
	recurringFrequency?: string
	sdkAppID?: string
	sdkEncData?: string
	sdkEphemPubKey?: any
	sdkMaxTimeout?: string
	sdkReferenceNumber?: string
	sdkTransID?: string
	shipAddrCity?: string
	shipAddrCountry?: string
	shipAddrLine1?: string
	shipAddrLine2?: string
	shipAddrLine3?: string
	shipAddrPostCode?: string
	shipAddrState?: string
	threeDSCompInd?: "Y" | "N" | "U"
	threeDSRequestorAuthenticationInd?:
		| "01"
		| "02"
		| "03"
		| "04"
		| "05"
		| "06"
		| "80"
		| "81"
		| "82"
		| "83"
		| "84"
		| "85"
		| "86"
		| "87"
		| "88"
		| "89"
		| "90"
		| "90"
		| "91"
		| "92"
		| "93"
		| "94"
		| "95"
		| "96"
		| "97"
		| "98"
		| "99"
	threeDSRequestorAuthenticationInfo?: ThreeDSRequestorAuthenticationInfo
	threeDSRequestorChallengeInd?:
		| "01"
		| "02"
		| "03"
		| "04"
		| "80"
		| "81"
		| "82"
		| "83"
		| "84"
		| "85"
		| "86"
		| "87"
		| "88"
		| "89"
		| "90"
		| "90"
		| "91"
		| "92"
		| "93"
		| "94"
		| "95"
		| "96"
		| "97"
		| "98"
		| "99"
	threeDSRequestorPriorAuthenticationInfo?: ThreeDSRequestorPriorAuthenticationInfo
	threeDSRequestorURL: string
	threeDSServerTransID: string
	threeRIInd?:
		| "01"
		| "02"
		| "03"
		| "04"
		| "05"
		| "80"
		| "81"
		| "82"
		| "83"
		| "84"
		| "85"
		| "86"
		| "87"
		| "88"
		| "89"
		| "90"
		| "90"
		| "91"
		| "92"
		| "93"
		| "94"
		| "95"
		| "96"
		| "97"
		| "98"
		| "99"
	transType?: "01" | "03" | "10" | "11" | "28"
	workPhone?: PhoneNumber
}

export namespace Request {
	export function limit(
		value: Partial<api.auth.Request> | api.auth.Request
	): Partial<api.auth.Request> | api.auth.Request {
		if (value.billAddrCity)
			value.billAddrCity = trim(value.billAddrCity, 50)
		if (value.billAddrLine1)
			value.billAddrLine1 = trim(value.billAddrLine1, 50)
		if (value.billAddrLine2)
			value.billAddrLine2 = trim(value.billAddrLine2, 50)
		if (value.billAddrLine3)
			value.billAddrLine3 = trim(value.billAddrLine3, 50)
		if (value.billAddrPostCode)
			value.billAddrPostCode = trim(value.billAddrPostCode, 16)
		if (value.browserAcceptHeader)
			value.browserAcceptHeader = trim(value.browserAcceptHeader, 2048)
		if (value.browserUserAgent)
			value.browserUserAgent = trim(value.browserUserAgent, 2048)
		if (value.cardholderName)
			value.cardholderName = trim(value.cardholderName, 45)
		if (value.email)
			value.email = trim(value.email, 254)
		if (value.merchantName)
			value.merchantName = trim(value.merchantName, 40)
		if (value.shipAddrCity)
			value.shipAddrCity = trim(value.shipAddrCity, 50)
		if (value.shipAddrLine1)
			value.shipAddrLine1 = trim(value.shipAddrLine1, 50)
		if (value.shipAddrLine2)
			value.shipAddrLine2 = trim(value.shipAddrLine2, 50)
		if (value.shipAddrLine3)
			value.shipAddrLine3 = trim(value.shipAddrLine3, 50)
		if (value.shipAddrPostCode)
			value.shipAddrPostCode = trim(value.shipAddrPostCode, 16)
		return value
	}
	export function is(value: Request | any): value is Request {
		return (
			typeof value == "object" &&
			(value.acctID == undefined || (typeof value.acctID == "string" && value.acctID.length <= 64)) &&
			(value.acctInfo == undefined || AcctInfo.is(value.acctInfo)) &&
			// typeof value.acctNumber == "string" && /^[0-9]{13,19}$/.test(value.acctNumber) &&
			(value.acctType == undefined ||
				(typeof value.acctType == "string" && /^(0[1-3]|[89][0-9])$/.test(value.acctType))) &&
			((value.messageCategory != "01" && value.acquirerBIN == undefined) ||
				(typeof value.acquirerBIN == "string" && value.acquirerBIN.length <= 11)) &&
			((value.messageCategory != "01" && value.acquirerMerchantID == undefined) ||
				(typeof value.acquirerMerchantID == "string" && value.acquirerMerchantID.length <= 35)) &&
			(value.addrMatch == undefined || value.addrMatch == "Y" || value.addrMatch == "N") &&
			(value.billAddrCity == undefined || (typeof value.billAddrCity == "string" && value.billAddrCity.length <= 50)) &&
			(value.billAddrCountry == undefined ||
				(typeof value.billAddrCountry == "string" &&
					value.billAddrCountry.length == 3 &&
					isoly.CountryCode.Numeric.is(+value.billAddrCountry))) &&
			(value.billAddrLine1 == undefined ||
				(typeof value.billAddrLine1 == "string" && value.billAddrLine1.length <= 50)) &&
			(value.billAddrLine2 == undefined ||
				(typeof value.billAddrLine2 == "string" && value.billAddrLine2.length <= 50)) &&
			(value.billAddrLine3 == undefined ||
				(typeof value.billAddrLine3 == "string" && value.billAddrLine3.length <= 50)) &&
			(value.billAddrPostCode == undefined ||
				(typeof value.billAddrPostCode == "string" && value.billAddrPostCode.length <= 16)) &&
			(value.billAddrState == undefined ||
				(typeof value.billAddrState == "string" && value.billAddrState.length <= 3)) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserAcceptHeader == "string" && value.browserAcceptHeader.length <= 2048)) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserColorDepth == "string" &&
					["1", "4", "8", "15", "16", "24", "32", "48"].includes(value.browserColorDepth))) &&
			(value.browserIP == undefined ||
				(typeof value.browserIP == "string" &&
					value.browserIP.length <= 45 &&
					(isIPv4(value.browserIP) || isIPv6(value.browserIP)))) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				typeof value.browserJavaEnabled == "boolean") &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserLanguage == "string" &&
					value.browserLanguage.length >= 1 &&
					value.browserLanguage.length <= 8)) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserScreenHeight == "string" && /^[0-9]{1,6}$/.test(value.browserScreenHeight))) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserScreenWidth == "string" && /^[0-9]{1,6}$/.test(value.browserScreenWidth))) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserTZ == "string" && /^[+-]?[0-9]{1,4}$/.test(value.browserTZ))) &&
			((value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
				(typeof value.browserUserAgent == "string" && value.browserUserAgent.length <= 2048)) &&
			(value.cardExpiryDate == undefined || ShortDate.is(value.cardExpiryDate)) &&
			(value.cardholderName == undefined ||
				(typeof value.cardholderName == "string" &&
					value.cardholderName.length >= 2 &&
					value.cardholderName.length <= 45)) &&
			(value.deviceChannel == "01" || value.deviceChannel == "02" || value.deviceChannel == "03") &&
			((value.deviceChannel != "01" && value.deviceRenderOptions == undefined) ||
				DeviceRenderOptions.is(value.deviceRenderOptions)) &&
			(value.email == undefined ||
				(typeof value.email == "string" && value.email.length <= 254 && /\S+@\S+/.test(value.email))) && // Very rough filter, denying only very obvious non email-adresses.
			(value.homePhone == undefined || PhoneNumber.is(value.homePhone)) &&
			((value.messageCategory != "01" && value.mcc == undefined) ||
				(typeof value.mcc == "string" && value.mcc.length == 4)) &&
			((value.messageCategory != "01" && value.merchantCountryCode == undefined) ||
				(typeof value.merchantCountryCode == "string" &&
					value.merchantCountryCode.length == 3 &&
					/^([0-8]\d\d)|900$/.test(value.merchantCountryCode))) &&
			((value.messageCategory != "01" && value.merchantName == undefined) ||
				(typeof value.merchantName == "string" && value.merchantName.length <= 40)) &&
			(value.merchantRiskIndicator == undefined || MerchantRiskIndicator.is(value.merchantRiskIndicator)) &&
			(value.messageCategory == "01" || value.messageCategory == "02") &&
			(value.messageExtension == undefined ||
				(Array.isArray(value.messageExtension) &&
					value.messageExtension.every((message: any) => MessageExtension.is(message)))) &&
			value.messageType == "AReq" &&
			(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
			(value.mobilePhone == undefined || PhoneNumber.is(value.mobilePhone)) &&
			((value.deviceChannel != "02" && value.notificationURL == undefined) ||
				(typeof value.notificationURL == "string" && value.notificationURL.length <= 256)) &&
			((value.messageCategory == "02" &&
				value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.purchaseAmount == undefined) ||
				(typeof value.purchaseAmount == "string" && /^\d{0,48}$/.test(value.purchaseAmount))) &&
			((value.messageCategory == "02" &&
				value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.purchaseCurrency == undefined) ||
				Currency.is(value.purchaseCurrency)) &&
			((value.messageCategory == "02" &&
				value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.purchaseDate == undefined) ||
				PreciseTime.is(value.purchaseDate)) &&
			((value.messageCategory == "02" &&
				value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.purchaseExponent == undefined) ||
				(typeof value.purchaseExponent == "string" && /^\d$/.test(value.purchaseExponent))) &&
			((value.threeDSRequestorAuthenticationInd != "03" && value.purchaseInstalData == undefined) ||
				(typeof value.purchaseInstalData == "string" &&
					value.purchaseInstalData.length <= 3 &&
					/(^(\d\d|\d\d\d)$)|(^[2-9]$)/.test(value.purchaseInstalData))) &&
			(value.payTokenInd == undefined || value.payTokenInd == true) &&
			((value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.recurringExpiry == undefined) ||
				Date.is(value.recurringExpiry)) &&
			((value.threeDSRequestorAuthenticationInd != "02" &&
				value.threeDSRequestorAuthenticationInd != "03" &&
				value.recurringFrequency == undefined) ||
				(typeof value.recurringFrequency == "string" && /^\d{0,4}$/.test(value.recurringFrequency))) &&
			((value.deviceChannel != "01" && value.sdkAppID == undefined) || typeof value.sdkAppID == "string") &&
			((value.deviceChannel != "01" && value.sdkEncData == undefined) ||
				(typeof value.sdkEncData == "string" && value.sdkEncData.length <= 64000)) &&
			((value.deviceChannel != "01" && value.sdkEphemPubKey == undefined) || value.sdkEphemPubKey != undefined) &&
			((value.deviceChannel != "01" && value.sdkMaxTimeout == undefined) ||
				(typeof value.sdkMaxTimeout == "string" &&
					value.sdkMaxTimeout.length == 2 &&
					/^(([1-9]\d)|(0[5-9]))$/.test(value.sdkMaxTimeout))) &&
			((value.deviceChannel != "01" && value.sdkReferenceNumber == undefined) ||
				(typeof value.sdkReferenceNumber == "string" && value.sdkReferenceNumber.length <= 32)) &&
			((value.deviceChannel != "01" && value.sdkTransID == undefined) || typeof value.sdkTransID == "string") &&
			(value.shipAddrCity == undefined || (typeof value.shipAddrCity == "string" && value.shipAddrCity.length <= 50)) &&
			((!value.shipAddrState && value.shipAddrCountry == undefined) ||
				(typeof value.shipAddrCountry == "string" &&
					value.shipAddrCountry.length == 3 &&
					isoly.CountryCode.Numeric.is(+value.shipAddrCountry))) &&
			(value.shipAddrLine1 == undefined ||
				(typeof value.shipAddrLine1 == "string" && value.shipAddrLine1.length <= 50)) &&
			(value.shipAddrLine2 == undefined ||
				(typeof value.shipAddrLine2 == "string" && value.shipAddrLine2.length <= 50)) &&
			(value.shipAddrLine3 == undefined ||
				(typeof value.shipAddrLine3 == "string" && value.shipAddrLine3.length <= 50)) &&
			(value.shipAddrPostCode == undefined ||
				(typeof value.shipAddrPostCode == "string" && value.shipAddrPostCode.length <= 16)) &&
			(value.shipAddrState == undefined ||
				(typeof value.shipAddrState == "string" && value.shipAddrState.length <= 3)) &&
			((value.deviceChannel != "02" && value.threeDSCompInd == undefined) ||
				value.threeDSCompInd == "Y" ||
				value.threeDSCompInd == "N" ||
				value.threeDSCompInd == "U") &&
			(value.threeDSRequestorAuthenticationInd == undefined ||
				/^(0[1-6]|[89][0-9])$/.test(value.threeDSRequestorAuthenticationInd)) &&
			(value.threeDSRequestorAuthenticationInfo == undefined ||
				ThreeDSRequestorAuthenticationInfo.is(value.threeDSRequestorAuthenticationInfo)) &&
			(value.threeDSRequestorChallengeInd == undefined ||
				/^(0[1-4]|[89][0-9])$/.test(value.threeDSRequestorChallengeInd)) &&
			(value.threeDSRequestorPriorAuthenticationInfo == undefined ||
				ThreeDSRequestorPriorAuthenticationInfo.is(value.threeDSRequestorPriorAuthenticationInfo)) &&
			typeof value.threeDSRequestorURL == "string" &&
			value.threeDSRequestorURL.length <= 2048 &&
			typeof value.threeDSServerTransID == "string" &&
			((value.deviceChannel != "03" && value.threeRIInd == undefined) ||
				(typeof value.threeRIInd == "string" && /^(0[1-5]|[89][0-9])$/.test(value.threeRIInd))) &&
			(value.transType == undefined ||
				value.transType == "01" ||
				value.transType == "03" ||
				value.transType == "10" ||
				value.transType == "11" ||
				value.transType == "28") &&
			(value.workPhone == undefined || PhoneNumber.is(value.workPhone))
		)
	}
	export function flaw(value: any | Request): gracely.Flaw {
		return {
			type: "api.auth.Request",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							value.acctID == undefined ||
								(typeof value.acctID == "string" && value.acctID.length <= 64) || {
									property: "acctID",
									type: "string | undefined",
								},
							value.acctInfo == undefined || AcctInfo.is(value.acctInfo) || { property: "acctInfo", type: "AcctInfo" },
							// typeof value.acctNumber == "string" && /^[0-9]{13,19}$/.test(value.acctNumber) || { property: "acctNumber", type: "string" },
							value.acctType == undefined ||
								(typeof value.acctType == "string" && /^(0[1-3]|[89][0-9])$/.test(value.acctType)) || {
									property: "acctType",
									type: "string | undefined",
								},
							(value.messageCategory != "01" && value.acquirerBIN == undefined) ||
								(typeof value.acquirerBIN == "string" && value.acquirerBIN.length <= 11) || {
									property: "acquirerBIN",
									type: "string | undefined",
								},
							(value.messageCategory != "01" && value.acquirerMerchantID == undefined) ||
								(typeof value.acquirerMerchantID == "string" && value.acquirerMerchantID.length <= 35) || {
									property: "acquirerMerchantID",
									type: "string | undefined",
								},
							value.addrMatch == undefined ||
								value.addrMatch == "Y" ||
								value.addrMatch == "N" || { property: "", type: '"Y" | "N" | undefined' },
							value.billAddrCity == undefined ||
								(typeof value.billAddrCity == "string" && value.billAddrCity.length <= 50) || {
									property: "billAddrCity",
									type: "string | undefined",
								},
							value.billAddrCountry == undefined ||
								(typeof value.billAddrCountry == "string" &&
									value.billAddrCountry.length == 3 &&
									isoly.CountryCode.Numeric.is(+value.billAddrCountry)) || {
									property: "billAddrCountry",
									type: "string | undefined",
								},
							value.billAddrLine1 == undefined ||
								(typeof value.billAddrLine1 == "string" && value.billAddrLine1.length <= 50) || {
									property: "billAddrLine1",
									type: "string | undefined",
								},
							value.billAddrLine2 == undefined ||
								(typeof value.billAddrLine2 == "string" && value.billAddrLine2.length <= 50) || {
									property: "billAddrLine2",
									type: "string | undefined",
								},
							value.billAddrLine3 == undefined ||
								(typeof value.billAddrLine3 == "string" && value.billAddrLine3.length <= 50) || {
									property: "billAddrLine3",
									type: "string | undefined",
								},
							value.billAddrPostCode == undefined ||
								(typeof value.billAddrPostCode == "string" && value.billAddrPostCode.length <= 16) || {
									property: "billAddrPostCode",
									type: "string | undefined",
								},
							value.billAddrState == undefined ||
								(typeof value.billAddrState == "string" && value.billAddrState.length <= 3) || {
									property: "billAddrState",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserAcceptHeader == "string" && value.browserAcceptHeader.length <= 2048) || {
									property: "browserAcceptHeader",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserColorDepth == "string" &&
									["1", "4", "8", "15", "16", "24", "32", "48"].includes(value.browserColorDepth)) || {
									property: "browserColorDepth",
									type: '"1" | "4" | "8" | "15" | "16" | "24" | "32" | "48" | undefined',
								},
							value.browserIP == undefined ||
								(typeof value.browserIP == "string" &&
									value.browserIP.length <= 45 &&
									(isIPv4(value.browserIP) || isIPv6(value.browserIP))) || {
									property: "browserIP",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								typeof value.browserJavaEnabled == "boolean" || {
									property: "browserJavaEnabled",
									type: "boolean | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserLanguage == "string" &&
									value.browserLanguage.length >= 1 &&
									value.browserLanguage.length <= 8) || { property: "browserLanguage", type: "string | undefined" },
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserScreenHeight == "string" && /^[0-9]{1,6}$/.test(value.browserScreenHeight)) || {
									property: "browserScreenHeight",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserScreenWidth == "string" && /^[0-9]{1,6}$/.test(value.browserScreenWidth)) || {
									property: "browserScreenWidth",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserTZ == "string" && /^[+-]?[0-9]{1,4}$/.test(value.browserTZ)) || {
									property: "browserTZ",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.browserAcceptHeader == undefined) ||
								(typeof value.browserUserAgent == "string" && value.browserUserAgent.length <= 2048) || {
									property: "browserUserAgent",
									type: "string | undefined",
								},
							value.cardExpiryDate == undefined ||
								ShortDate.is(value.cardExpiryDate) || {
									property: "cardExpiryDate",
									type: "api.model.ShortDate | undefined",
								},
							value.cardholderName == undefined ||
								(typeof value.cardholderName == "string" &&
									value.cardholderName.length >= 2 &&
									value.cardholderName.length <= 45) || { property: "cardholderName", type: "string | undefined" },
							value.deviceChannel == "01" ||
								value.deviceChannel == "02" ||
								value.deviceChannel == "03" || { property: "deviceChannel", type: '"01" | "02" | "03"' },
							(value.deviceChannel != "01" && value.deviceRenderOptions == undefined) ||
								DeviceRenderOptions.is(value.deviceRenderOptions) || {
									property: "deviceRenderOptions",
									type: "api.model.DeviceRenderOptions | undefined",
								},
							value.email == undefined ||
								(typeof value.email == "string" && value.email.length <= 254 && /\S+@\S+/.test(value.email)) || {
									property: "email",
									type: "string | undefined",
								}, // Very rough filter, denying only very obvious non email-adresses.
							value.homePhone == undefined ||
								PhoneNumber.is(value.homePhone) || { property: "homePhone", type: "api.model.PhoneNumber | undefined" },
							(value.messageCategory != "01" && value.mcc == undefined) ||
								(typeof value.mcc == "string" && value.mcc.length == 4) || {
									property: "mcc",
									type: "string | undefined",
								},
							(value.messageCategory != "01" && value.merchantCountryCode == undefined) ||
								(typeof value.merchantCountryCode == "string" &&
									value.merchantCountryCode.length == 3 &&
									/^([0-8]\d\d)|900$/.test(value.merchantCountryCode)) || {
									property: "merchantCountryCode",
									type: "string | undefined",
								},
							(value.messageCategory != "01" && value.merchantName == undefined) ||
								(typeof value.merchantName == "string" && value.merchantName.length <= 40) || {
									property: "merchantName",
									type: "string | undefined",
								},
							value.merchantRiskIndicator == undefined ||
								MerchantRiskIndicator.is(value.merchantRiskIndicator) || {
									property: "merchantRiskIndicator",
									type: "api.model.MerchantRiskIndicator | undefined",
								},
							value.messageCategory == "01" ||
								value.messageCategory == "02" || { property: "messageCategory", type: '"01" | "02"' },
							value.messageExtension == undefined ||
								(Array.isArray(value.messageExtension) &&
									value.messageExtension.every((message: any) => MessageExtension.is(message))) || {
									property: "messageExtension",
									type: "api.model.MessageExtension | undefined",
								},
							value.messageType == "AReq" || { property: "messageType", type: '"AReq"' },
							value.messageVersion == "2.1.0" ||
								value.messageVersion == "2.2.0" || { property: "messageVersion", type: '"2.1.0" | "2.2.0"' },
							value.mobilePhone == undefined ||
								PhoneNumber.is(value.mobilePhone) || {
									property: "mobilePhone",
									type: "api.model.PhoneNumber | undefined",
								},
							(value.deviceChannel != "02" && value.notificationURL == undefined) ||
								(typeof value.notificationURL == "string" && value.notificationURL.length <= 256) || {
									property: "notificationURL",
									type: "string | undefined",
								},
							(value.messageCategory == "02" &&
								value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.purchaseAmount == undefined) ||
								(typeof value.purchaseAmount == "string" && /^\d{0,48}$/.test(value.purchaseAmount)) || {
									property: "purchaseAmount",
									type: "string | undefined",
								},
							(value.messageCategory == "02" &&
								value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.purchaseCurrency == undefined) ||
								Currency.is(value.purchaseCurrency) || {
									property: "purchaseCurrency",
									type: "api.model.Currency | undefined",
								},
							(value.messageCategory == "02" &&
								value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.purchaseDate == undefined) ||
								PreciseTime.is(value.purchaseDate) || {
									property: "purchaseDate",
									type: "api.model.PreciseTime | undefined",
								},
							(value.messageCategory == "02" &&
								value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.purchaseExponent == undefined) ||
								(typeof value.purchaseExponent == "string" && /^\d$/.test(value.purchaseExponent)) || {
									property: "purchaseExponent",
									type: "string | undefined",
								},
							(value.threeDSRequestorAuthenticationInd != "03" && value.purchaseInstalData == undefined) ||
								(typeof value.purchaseInstalData == "string" &&
									value.purchaseInstalData.length <= 3 &&
									/(^(\d\d|\d\d\d)$)|(^[2-9]$)/.test(value.purchaseInstalData)) || {
									property: "purchaseInstalData",
									type: "string | undefined",
								},
							value.payTokenInd == undefined ||
								value.payTokenInd == true || { property: "payTokenInd", type: "true | undefined" },
							(value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.recurringExpiry == undefined) ||
								Date.is(value.recurringExpiry) || { property: "recurringExpiry", type: "api.model.Date | undefined" },
							(value.threeDSRequestorAuthenticationInd != "02" &&
								value.threeDSRequestorAuthenticationInd != "03" &&
								value.recurringFrequency == undefined) ||
								(typeof value.recurringFrequency == "string" && /^\d{0,4}$/.test(value.recurringFrequency)) || {
									property: "recurringFrequency",
									type: "string | undefined",
								},
							(value.deviceChannel != "01" && value.sdkAppID == undefined) ||
								typeof value.sdkAppID == "string" || { property: "sdkAppID", type: "string | undefined" },
							(value.deviceChannel != "01" && value.sdkEncData == undefined) ||
								(typeof value.sdkEncData == "string" && value.sdkEncData.length <= 64000) || {
									property: "sdkEncData",
									type: "string | undefined",
								},
							(value.deviceChannel != "01" && value.sdkEphemPubKey == undefined) ||
								value.sdkEphemPubKey != undefined || { property: "sdkEphemPubKey", type: "string | undefined" },
							(value.deviceChannel != "01" && value.sdkMaxTimeout == undefined) ||
								(typeof value.sdkMaxTimeout == "string" &&
									value.sdkMaxTimeout.length == 2 &&
									/^(([1-9]\d)|(0[5-9]))$/.test(value.sdkMaxTimeout)) || {
									property: "sdkMaxTimeout",
									type: "string | undefined",
								},
							(value.deviceChannel != "01" && value.sdkReferenceNumber == undefined) ||
								(typeof value.sdkReferenceNumber == "string" && value.sdkReferenceNumber.length <= 32) || {
									property: "sdkReferenceNumber",
									type: "string | undefined",
								},
							(value.deviceChannel != "01" && value.sdkTransID == undefined) ||
								typeof value.sdkTransID == "string" || { property: "sdkTransID", type: "string | undefined" },
							value.shipAddrCity == undefined ||
								(typeof value.shipAddrCity == "string" && value.shipAddrCity.length <= 50) || {
									property: "shipAddrCity",
									type: "string | undefined",
								},
							(!value.shipAddrState && value.shipAddrCountry == undefined) ||
								(typeof value.shipAddrCountry == "string" &&
									value.shipAddrCountry.length == 3 &&
									isoly.CountryCode.Numeric.is(+value.shipAddrCountry)) || {
									property: "shipAddrCountry",
									type: "string | undefined",
								},
							value.shipAddrLine1 == undefined ||
								(typeof value.shipAddrLine1 == "string" && value.shipAddrLine1.length <= 50) || {
									property: "shipAddrLine1",
									type: "string | undefined",
								},
							value.shipAddrLine2 == undefined ||
								(typeof value.shipAddrLine2 == "string" && value.shipAddrLine2.length <= 50) || {
									property: "shipAddrLine2",
									type: "string | undefined",
								},
							value.shipAddrLine3 == undefined ||
								(typeof value.shipAddrLine3 == "string" && value.shipAddrLine3.length <= 50) || {
									property: "shipAddrLine3",
									type: "string | undefined",
								},
							value.shipAddrPostCode == undefined ||
								(typeof value.shipAddrPostCode == "string" && value.shipAddrPostCode.length <= 16) || {
									property: "shipAddrPostCode",
									type: "string | undefined",
								},
							value.shipAddrState == undefined ||
								(typeof value.shipAddrState == "string" && value.shipAddrState.length <= 3) || {
									property: "shipAddrState",
									type: "string | undefined",
								},
							(value.deviceChannel != "02" && value.threeDSCompInd == undefined) ||
								value.threeDSCompInd == "Y" ||
								value.threeDSCompInd == "N" ||
								value.threeDSCompInd == "U" || { property: "threeDSCompInd", type: '"Y" | "N" | "U" | undefined' },
							value.threeDSRequestorAuthenticationInd == undefined ||
								/^(0[1-6]|[89][0-9])$/.test(value.threeDSRequestorAuthenticationInd) || {
									property: "threeDSRequestorAuthenticationInd",
									type: "string | undefined",
								},
							value.threeDSRequestorAuthenticationInfo == undefined ||
								ThreeDSRequestorAuthenticationInfo.is(value.threeDSRequestorAuthenticationInfo) || {
									property: "threeDSRequestorAuthenticationInfo",
									type: "api.model.ThreeDSRequestorAuthenticationInfo | undefined",
								},
							value.threeDSRequestorChallengeInd == undefined ||
								/^(0[1-4]|[89][0-9])$/.test(value.threeDSRequestorChallengeInd) || {
									property: "threeDSRequestorChallengeInd",
									type: "string | undefined",
								},
							value.threeDSRequestorPriorAuthenticationInfo == undefined ||
								ThreeDSRequestorPriorAuthenticationInfo.is(value.threeDSRequestorPriorAuthenticationInfo) || {
									property: "threeDSRequestorPriorAuthenticationInfo",
									type: "api.model.ThreeDSRequestorPriorAuthenticationInfo | undefined",
								},
							(typeof value.threeDSRequestorURL == "string" && value.threeDSRequestorURL.length <= 2048) || {
								property: "threeDSRequestorURL",
								type: "string | undefined",
							},
							typeof value.threeDSServerTransID == "string" || { property: "threeDSServerTransID", type: "string" },
							(value.deviceChannel != "03" && value.threeRIInd == undefined) ||
								(typeof value.threeRIInd == "string" && /^(0[1-5]|[89][0-9])$/.test(value.threeRIInd)) || {
									property: "threeRIInd",
									type: "string | undefined",
								},
							value.transType == undefined ||
								value.transType == "01" ||
								value.transType == "03" ||
								value.transType == "10" ||
								value.transType == "11" ||
								value.transType == "28" || {
									property: "transType",
									type: '"01" | "03" | "10" | "11" | "28" | undefined',
								},
							value.workPhone == undefined ||
								PhoneNumber.is(value.workPhone) || { property: "workPhone", type: "api.model.PhoneNumber | undefined" },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	function trim(value: string | undefined, maxLength: number): string | undefined {
		value = value ? value.trim() : value
		return value ? (value.length > maxLength ? value.substring(0, maxLength) : value) : undefined
	}
}
