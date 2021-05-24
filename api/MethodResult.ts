import { Response as PreAuthorizationResponse } from "./preauth/Response"

export interface MethodResult {
	id: string
	version: "2.1.0" | "2.2.0"
	status: "Y" | "U" | "N"
}
export namespace MethodResult {
	export function is(value: any | MethodResult): value is MethodResult {
		return (
			typeof value == "object" &&
			typeof value.id == "string" &&
			typeof value.version == "string" &&
			["Y", "N", "U"].includes(value.status)
		)
	}
	export function from(response: PreAuthorizationResponse, method?: "performed" | "failed"): MethodResult {
		return {
			id: response.threeDSServerTransID,
			version:
				response.acsStartProtocolVersion == "2.2.0" || response.dsStartProtocolVersion == "2.2.0" ? "2.2.0" : "2.1.0",
			status: !response.threeDSMethodURL ? "U" : method == "failed" ? "N" : "Y",
		}
	}
}
