import { ValidVersion } from "../model/ValidVersion"

export interface Response {
	acsEndProtocolVersion: ValidVersion
	acsInfoInd?: string[]
	acsStartProtocolVersion: ValidVersion
	dsEndProtocolVersion?: ValidVersion
	dsStartProtocolVersion?: ValidVersion
	endRange: string
	startRange: string
	threeDSMethodURL?: string
	threeDSServerTransID: string
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			ValidVersion.is(value.acsEndProtocolVersion) &&
			(value.acsInfoInd == undefined ||
				(Array.isArray(value.acsInfoInd) &&
					value.acsInfoInd.every(
						(information: string | any) => typeof information == "string" && /^(0[1-4]|[89][0-9])$/.test(information)
					))) &&
			ValidVersion.is(value.acsStartProtocolVersion) &&
			(value.dsEndProtocolVersion == undefined || ValidVersion.is(value.dsEndProtocolVersion)) &&
			(value.dsStartProtocolVersion == undefined || ValidVersion.is(value.dsStartProtocolVersion)) &&
			typeof value.endRange == "string" &&
			/^[0-9]{13,19}$/.test(value.endRange) &&
			typeof value.startRange == "string" &&
			/^[0-9]{13,19}$/.test(value.startRange) &&
			(value.threeDSMethodURL == undefined ||
				(typeof value.threeDSMethodURL == "string" && value.threeDSMethodURL.length <= 256)) &&
			typeof value.threeDSServerTransID == "string"
		)
	}
}
