// tslint:disable-next-line: no-empty-interface
export interface Request {
	// acctNumber: string // May be pan number, added in Cardfunc.
}

// tslint:disable-next-line: no-namespace
export namespace Request {
	export function is(value: Request | any): value is Request {
		return typeof value == "object"
			// typeof value.acctNumber == "string" && /^[0-9]{13,19}$/.test(value.acctNumber)
	}
}
