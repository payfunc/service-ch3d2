export interface Request {
	TODO: true
}

export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" && false
	}
}
