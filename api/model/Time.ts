import * as isoly from "isoly"
import { Date } from "./Date"

export type Time = string

// tslint:disable-next-line: no-namespace
export namespace Time {
	export function is(value: Time | any): value is Time {
		return typeof value == "string" && value.length == 12 &&
			Date.is(value.substring(0, 8)) &&
			/^(([01]\d|2[0-3])[0-5]\d|2400)$/.test(value.substring(8, 12))
	}
	export function from(date: isoly.DateTime | undefined): Time | undefined {
		return !date ? undefined : date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10) + date.substring(11, 13) + date.substring(14, 16)
	}
}
