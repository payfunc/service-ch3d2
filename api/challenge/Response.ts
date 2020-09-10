import { MessageExtension } from "../model/MessageExtension"

export interface Response {
	acsCounterAtoS?: string
	acsTransID: string
	challengeCompletionIndicator?: "Y" | "N"
	messageExtension?: MessageExtension
	messageType: "CRes"
	messageVersion: "2.1.0" | "2.2.0"
	sdkTransID?: string
	threeDSServerTransID: string
	transStatus: "Y" | "N"
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			(value.acsCounterAtoS == undefined || typeof value.acsCounterAtoS == "string") &&
			typeof value.acsTransID == "string" &&
			(value.challengeCompletionIndicator == undefined ||
				value.challengeCompletionIndicator == "Y" ||
				value.challengeCompletionIndicator == "N") &&
			(value.messageExtension == undefined || MessageExtension.is(value.messageExtension)) &&
			value.messageType == "CRes" &&
			(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
			(value.sdkTransID == undefined || typeof value.sdkTransID == "string") &&
			typeof value.threeDSServerTransID == "string" &&
			(value.transStatus == "Y" || value.transStatus == "N")
		)
	}
}
