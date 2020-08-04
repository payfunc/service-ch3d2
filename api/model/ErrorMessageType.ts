export type ErrorMessageType = "ARes" | "AReq" | "PRes" | "PReq" | "CRes" | "CReq" | "RReq" | "RRes" | "Erro"

// tslint:disable-next-line: no-namespace
export namespace ErrorMessageType {
	export function is(value: ErrorMessageType | any): value is ErrorMessageType {
		return typeof value == "string" && (value == "ARes" || value == "AReq" || value == "PRes" || value == "PReq" || value == "CRes" || value == "CReq" || value == "RReq" || value == "RRes" || value == "Erro")
	}
}
