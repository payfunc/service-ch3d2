import { Response as PreAuthorizationResponse } from "./preauth/Response"

export interface MethodResult {
	threeDSServerTransID: string
	messageVersion: "2.1.0" | "2.2.0"
	threeDSCompInd: "Y" | "U" | "N"
}
export namespace MethodResult {
	export function is(value: any | MethodResult): value is MethodResult {
		return (
			typeof value == "object" &&
			typeof value.threeDSServerTransID == "string" &&
			typeof value.messageVersion == "string" &&
			["Y", "N", "U"].includes(value.threeDSCompInd)
		)
	}
	export function from(response: PreAuthorizationResponse, method?: "performed" | "failed"): MethodResult {
		return {
			threeDSServerTransID: response.threeDSServerTransID,
			messageVersion:
				response.acsStartProtocolVersion == "2.2.0" || response.dsStartProtocolVersion == "2.2.0" ? "2.2.0" : "2.1.0",
			threeDSCompInd: !response.threeDSMethodURL ? "U" : method == "failed" ? "N" : "Y",
		}
	}
}
