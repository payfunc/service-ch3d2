import { ErrorCode } from "./model/ErrorCode"
import { ErrorMessageType } from "./model/ErrorMessageType"

export interface Error {
	acsTransID?: string
	dsTransID?: string
	errorCode: ErrorCode
	errorComponent: "C" | "S" | "D" | "A"
	errorDescription: string
	errorDetail: string
	errorMessageType?: ErrorMessageType | string
	messageType: "Erro"
	messageVersion: "2.1.0" | "2.2.0"
	sdkTransID?: string
	threeDSServerTransID?: string
}

export namespace Error {
	export function is(value: Error | any): value is Error {
		return (
			typeof value == "object" &&
			(value.acsTransID == undefined || typeof value.acsTransID == "string") &&
			(value.dsTransID == undefined || typeof value.dsTransID == "string") &&
			ErrorCode.is(value.errorCode) &&
			typeof value.errorComponent == "string" &&
			typeof value.errorDescription == "string" &&
			typeof value.errorDetail == "string" &&
			(value.errorMessageType == undefined || typeof value.errorMessageType == "string") &&
			(value.messageType == "Erro" || value.messageType == "erro") &&
			typeof value.messageVersion == "string" &&
			(value.sdkTransID == undefined || typeof value.sdkTransID == "string") &&
			(value.threeDSServerTransID == undefined || typeof value.threeDSServerTransID == "string")
		)
	}
}
