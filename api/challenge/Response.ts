import { ValidVersion } from "../model/ValidVersion"

export interface Response {
	TODO: true
}

// tslint:disable-next-line: no-namespace
export namespace Response {
	export function is(value: Response | any): value is Response {
		return typeof value == "object" &&
			false
	}
}
