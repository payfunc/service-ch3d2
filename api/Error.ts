import { ErrorCode } from "./model/ErrorCode"
import { ErrorMessageType } from "./model/ErrorMessageType"

export interface Error {
	acsTransID?: string
	dsTransID?: string
	errorCode: ErrorCode
	errorComponent: "C" | "S" | "D" | "A"
	errorDescription: string
	errorDetail: string
	errorMessageType?: ErrorMessageType
	messageType: "erro"
	messageVersion: "2.1.0" | "2.2.0"
	sdkTransID?: string
	threeDSServerTransID: string
}

// tslint:disable-next-line: no-namespace
export namespace Error {
	export function is(value: Error | any): value is Error {
		return typeof value == "object" &&
			(value.acsTransID == undefined || typeof value.acsTransID == "string") &&
			(value.dsTransID == undefined || typeof value.dsTransID == "string") &&
			ErrorCode.is(value.errorCode) &&
			(value.errorComponent == "C" || value.errorComponent == "S" || value.errorComponent == "D" || value.errorComponent == "A") &&
			typeof value.errorDescription == "string" &&
			typeof value.errorDetail == "string" &&
			ErrorMessageType.is(value.errorMessageType) &&
			value.messageType == "erro" &&
			(value.messageVersion == "2.1.0" || value.messageVersion == "2.2.0") &&
			(value.sdkTransID == undefined || typeof value.sdkTransID == "string") &&
			typeof value.threeDSServerTransID == "string"
	}
}
