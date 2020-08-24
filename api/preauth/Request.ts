// eslint-disable-next-line
export interface Request {
	// acctNumber: string // May be pan number, added in Cardfunc.
}

export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object"
		// typeof value.acctNumber == "string" && /^[0-9]{13,19}$/.test(value.acctNumber)
	}
}
