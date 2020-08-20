export interface Request {
	threeDSServerTransID: string
}

export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object" && typeof value.threeDSServerTransID == "string"
	}
}
