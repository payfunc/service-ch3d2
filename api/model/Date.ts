import * as isoly from "isoly"

export type Date = string

// tslint:disable-next-line: no-namespace
export namespace Date {
	export function is(value: Date | any): value is Date {
		return typeof value == "string" && value.length == 8 &&
			/^\d\d\d\d((01|03|05|07|08|10|12)(0[1-9]|[12][0-9]|3[01])|(04|06|09|11)(0[1-9]|[12][0-9]|30)|02(0[1-9]|1[0-9]|2[0-9]))$/.test(value)
	}
	export function from(date: isoly.DateTime | undefined): Date | undefined {
		return !date ? undefined : date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10)
	}
}
