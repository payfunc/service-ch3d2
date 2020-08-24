import { Time } from "../model/Time"

export interface ThreeDSRequestorAuthenticationInfo {
	threeDSReqAuthData?: string
	threeDSReqAuthMethod?:
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
	threeDSReqAuthTimestamp?: Time
}

export namespace ThreeDSRequestorAuthenticationInfo {
	export function is(value: ThreeDSRequestorAuthenticationInfo | any): value is ThreeDSRequestorAuthenticationInfo {
		return (
			typeof value == "object" &&
			(value.threeDSReqAuthData == undefined ||
				(typeof value.threeDSReqAuthData == "string" && value.threeDSReqAuthData.length <= 2048)) &&
			(value.threeDSReqAuthMethod == undefined || /^(0[1-6]|[89][0-9])$/.test(value.threeDSReqAuthMethod)) &&
			(value.threeDSReqAuthTimestamp == undefined || Time.is(value.threeDSReqAuthTimestamp))
		)
	}
}
