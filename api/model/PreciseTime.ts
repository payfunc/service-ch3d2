import * as isoly from "isoly"
import { Date } from "./Date"

export type PreciseTime = string

export namespace PreciseTime {
	export function is(value: PreciseTime | any): value is PreciseTime {
		return (
			typeof value == "string" &&
			value.length == 14 &&
			Date.is(value.substring(0, 8)) &&
			/^(([01]\d|2[0-3])([0-5]\d){2}|235960|240000)$/.test(value.substring(8, 14))
		)
	}
	export function from(date: isoly.DateTime | undefined): PreciseTime | undefined {
		return !date
			? undefined
			: date.substring(0, 4) +
					date.substring(5, 7) +
					date.substring(8, 10) +
					date.substring(11, 13) +
					date.substring(14, 16) +
					date.substring(17, 19)
	}
}
