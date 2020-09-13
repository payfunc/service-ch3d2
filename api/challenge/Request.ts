import { MessageExtension } from "../model/MessageExtension"

export interface Request {
	acsTransID: string
	messageExtension?: MessageExtension
	messageType: "CReq"
	messageVersion: "2.1.0" | "2.2.0"
	threeDSServerTransID: string
	challengeWindowSize: "01" | "02" | "03" | "04" | "05"
}

export namespace Request {
	export function is(value: Request | any): value is Request {
		return (
			typeof value == "object" &&
			typeof value.acsTransId == "string" &&
			(value.messageExtension == undefined || MessageExtension.is(value.messageExtension)) &&
			value.messageType == "CReq" &&
			(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
			typeof value.threeDSServerTransID == "string" &&
			(value.transStatus == "Y" || value.transStatus == "N") &&
			(value.challengeWindowSize == "01" ||
				value.challengeWindowSize == "02" ||
				value.challengeWindowSize == "03" ||
				value.challengeWindowSize == "04" ||
				value.challengeWindowSize == "05")
		)
	}
}
