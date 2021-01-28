import * as authly from "authly"
import { AcsRenderingType } from "../model/AcsRenderingType"
import { MessageExtension } from "../model/MessageExtension"

export interface Response {
	acsRenderingType?: AcsRenderingType
	acsTransID: string
	authenticationType?: "01" | "02" | "03"
	authenticationValue?: string
	challengeCancel?: "01" | "04" | "05" | "06" | "07" | "08"
	dsTransID: string
	eci?: string
	interactionCounter?: string
	messageCategory: "01" | "02"
	messageExtension?: MessageExtension[]
	messageType: "RReq"
	messageVersion: "2.1.0" | "2.2.0"
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
	payfunc?: { token?: authly.Token }
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			(typeof value == "object" &&
				(value.acsRenderingType == undefined || AcsRenderingType.is(value.acsRenderingType)) &&
				typeof value.acsTransID == "string" &&
				(value.authenticationType == undefined ||
					value.authenticationType == "01" ||
					value.authenticationType == "02" ||
					value.authenticationType == "03") &&
				(value.authenticationValue == undefined ||
					(typeof value.authenticationValue == "string" && value.authenticationValue.length == 28)) &&
				(value.challengeCancel == undefined ||
					value.challengeCancel == "01" ||
					value.challengeCancel == "04" ||
					value.challengeCancel == "05" ||
					value.challengeCancel == "06" ||
					value.challengeCancel == "07" ||
					value.challengeCancel == "08") &&
				typeof value.dsTransID == "string" &&
				value.dsTransID.length <= 36 &&
				(value.eci == undefined || (typeof value.eci == "string" && value.eci.length <= 2)) &&
				(value.interactionCounter == undefined || /^\d\d$/.test(value.interactionCounter)) &&
				value.messageCategory == "01") ||
			(value.messageCategory == "02" &&
				(value.messageExtension == undefined ||
					(Array.isArray(value.messageExtension) &&
						value.messageExtension.length <= 10 &&
						value.messageExtension.every((message: any) => MessageExtension.is(message)))) &&
				value.messageType == "RReq" &&
				(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
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
						/^(0[1-9]|1\d|20|21)$/.test(value.transStatusReason))))
		)
	}
}
