import * as isoly from "isoly"

export type Currency = isoly.CurrencyCode

// tslint:disable-next-line: no-namespace
export namespace Currency {
	export function is(value: Currency | any): value is Currency {
		return isoly.CurrencyCode.is(value) &&
			value != "955" && value != "956" && value != "957" && value != "958" && value != "959" && value != "960" && value != "961" && value != "962" && value != "963" && value != "964" && value != "999"
	}
}
