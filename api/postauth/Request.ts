export interface Request {
	threeDSServerTransID: string
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" &&
			typeof value.threeDSServerTransID == "string"
	}
}
