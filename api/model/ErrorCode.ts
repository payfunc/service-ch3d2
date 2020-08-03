export type ErrorCode = "101" | "102" | "103" | "201" | "202" | "203" | "204" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "402" | "403" | "404" | "405"

// tslint:disable-next-line: no-namespace
export namespace ErrorCode {
	export function is(value: ErrorCode | any): value is ErrorCode {
		return typeof value == "string" &&
			(
				value == "101" || value == "102" || value == "103" || value == "201" || value == "202" || value == "203" || value == "204" || value == "301" || value == "302" ||
				value == "303" || value == "304" || value == "305" || value == "306" || value == "307" || value == "402" || value == "403" || value == "404" || value == "405"
			)
	}
}
