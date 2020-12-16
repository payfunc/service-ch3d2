import { MessageExtension } from "../model/MessageExtension"

export interface Response {
	acsCounterAtoS?: string
	acsTransID: string
	challengeCompletionInd?: "Y" | "N"
	messageExtension?: MessageExtension | MessageExtension[]
	messageType: "CRes"
	messageVersion: "2.1.0" | "2.2.0" | string
	sdkTransID?: string
	threeDSServerTransID: string
	transStatus?: "Y" | "N"
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return (
			typeof value == "object" &&
			(value.acsCounterAtoS == undefined || typeof value.acsCounterAtoS == "string") &&
			typeof value.acsTransID == "string" &&
			(value.challengeCompletionInd == undefined ||
				value.challengeCompletionInd == "Y" ||
				value.challengeCompletionInd == "N") &&
			(value.messageExtension == undefined ||
				MessageExtension.is(value.messageExtension) ||
				(Array.isArray(value.messageExtension) && value.messageExtension.every(MessageExtension.is))) &&
			(value.messageType == "CRes" || value.messageType == "cres") &&
			typeof value.messageVersion == "string" &&
			(value.sdkTransID == undefined || typeof value.sdkTransID == "string") &&
			typeof value.threeDSServerTransID == "string" &&
			(value.transStatus == undefined || value.transStatus == "Y" || value.transStatus == "N")
		)
	}
}
