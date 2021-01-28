import * as authly from "authly"
import { AcsRenderingType } from "../model/AcsRenderingType"
import { MessageExtension } from "../model/MessageExtension"

export interface Response {
	acsChallengeMandated?: "Y" | "N"
	acsOperatorID?: string
	acsReferenceNumber?: string
	acsRenderingType?: AcsRenderingType
	acsSignedContent?: string
	acsTransID: string
	acsURL?: string
	authenticationType?: "01" | "02" | "03"
	authenticationValue?: string
	cardholderInfo?: string
	dsReferenceNumber: string
	dsTransID: string
	eci?: string
	messageExtension?: MessageExtension[]
	messageType: "ARes"
	messageVersion: "2.1.0" | "2.2.0"
	sdkTransID?: string
	threeDSServerTransID: string
	transStatus?: "Y" | "N" | "U" | "A" | "C" | "R"
	transStatusReason?:
		| "01"
		| "02"
		| "03"
		| "04"
		| "05"
		| "06"
		| "07"
		| "08"
		| "09"
		| "10"
		| "11"
		| "12"
		| "13"
		| "14"
		| "15"
		| "16"
		| "17"
		| "18"
		| "19"
		| "20"
		| "21"
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
		| "91"
		| "92"
		| "93"
		| "94"
		| "95"
		| "96"
		| "97"
		| "98"
		| "99"
	payfunc?: { token?: authly.Token }
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			(value.messageType == "ARes" || value.messageType == "ares") &&
			(value.transStatus == undefined ||
				value.transStatus == "Y" ||
				value.transStatus == "N" ||
				value.transStatus == "U" ||
				value.transStatus == "A" ||
				value.transStatus == "C" ||
				value.transStatus == "R") &&
			(value.acsURL == undefined || typeof value.acsURL == "string")
		)
	}
	export function isStrict(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			(value.acsChallengeMandated == undefined ||
				value.acsChallengeMandated == "Y" ||
				value.acsChallengeMandated == "N") &&
			(value.acsOperatorID == undefined ||
				(typeof value.acsOperatorID == "string" && value.acsOperatorID.length <= 32)) &&
			(value.acsReferenceNumber == undefined ||
				(typeof value.acsReferenceNumber == "string" && value.acsReferenceNumber.length <= 32)) &&
			(value.acsRenderingType == undefined || AcsRenderingType.is(value.acsRenderingType)) &&
			(value.acsSignedContent == undefined || typeof value.acsSignedContent == "string") &&
			typeof value.acsTransID == "string" &&
			(value.acsURL == undefined || (typeof value.acsURL == "string" && value.acsURL.length <= 2048)) &&
			(value.authenticationType == undefined ||
				value.authenticationType == "01" ||
				value.authenticationType == "02" ||
				value.authenticationType == "03") &&
			(value.authenticationValue == undefined ||
				(typeof value.authenticationValue == "string" && value.authenticationValue.length == 28)) &&
			(value.cardholderInfo == undefined ||
				(typeof value.cardholderInfo == "string" && value.cardholderInfo.length <= 128)) &&
			typeof value.dsReferenceNumber == "string" &&
			value.dsReferenceNumber.length <= 32 &&
			typeof value.dsTransID == "string" &&
			(value.eci == undefined || (typeof value.eci == "string" && value.eci.length <= 2)) &&
			(value.messageExtension == undefined ||
				(Array.isArray(value.messageExtension) &&
					value.messageExtension.length <= 10 &&
					value.messageExtension.every((message: any) => MessageExtension.is(message)))) &&
			value.messageType == "ARes" &&
			(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
			(value.sdkTransID == undefined || typeof value.sdkTransID == "string") &&
			typeof value.threeDSServerTransID == "string" &&
			(value.transStatus == undefined ||
				value.transStatus == "Y" ||
				value.transStatus == "N" ||
				value.transStatus == "U" ||
				value.transStatus == "A" ||
				value.transStatus == "C" ||
				value.transStatus == "R") &&
			(value.transStatusReason == undefined ||
				(typeof value.transStatusReason == "string" &&
					value.transStatusReason.length == 2 &&
					/^(0[1-9]|1[0-9]|2[0-1]|[89][0-9])$/.test(value.transStatusReason)))
		)
	}
}
