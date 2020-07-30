import { Time } from "../model/Time"

export interface ThreeDSRequestorPriorAuthenticationInfo {
	threeDSReqPriorAuthData?: string
	threeDSReqPriorAuthMethod?: "01" | "02" | "03" | "04" | "80" | "81" | "82" | "83" | "84" | "85" | "86" | "87" | "88" | "89" | "90" | "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99"
	threeDSReqPriorAuthTimestamp?: Time
	threeDSReqPriorRef?: string
}

// tslint:disable-next-line: no-namespace
export namespace ThreeDSRequestorPriorAuthenticationInfo {
	export function is(value: ThreeDSRequestorPriorAuthenticationInfo | any): value is ThreeDSRequestorPriorAuthenticationInfo {
		return typeof value == "object" &&
			(value.threeDSReqPriorAuthData == undefined || typeof value.threeDSReqPriorAuthData == "string" && value.threeDSReqPriorAuthData.length <= 2048) &&
			(value.threeDSReqPriorAuthMethod == undefined || /^(0[1-4]|[89][0-9])$/.test(value.threeDSReqPriorAuthMethod)) &&
			(value.threeDSReqPriorAuthTimestamp == undefined || Time.is(value.threeDSReqPriorAuthTimestamp)) &&
			(value.threeDSReqPriorRef == undefined || typeof value.threeDSReqPriorRef == "string" && value.threeDSReqPriorRef.length <= 36)
	}
}
