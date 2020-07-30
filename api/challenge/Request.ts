export interface Request {
	TODO: true
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" &&
			false
	}
}
