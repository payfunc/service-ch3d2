export interface Response {
	TODO: true
}

export namespace Response {
	export function is(value: Response | any): value is Response {
		return typeof value == "object" && false
	}
}
