import * as isoly from "isoly"

export type ShortDate = string

export namespace ShortDate {
	export function is(value: ShortDate | any): value is ShortDate {
		return typeof value == "string" && value.length == 4 && /^\d\d(0[1-9]|1[0-2])$/.test(value)
	}
	export function from(date: isoly.DateTime | undefined): ShortDate | undefined {
		return !date ? undefined : date.substring(2, 4) + date.substring(5, 7)
	}
}
