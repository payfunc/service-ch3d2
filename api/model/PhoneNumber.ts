export interface PhoneNumber {
	cc: string
	subscriber: string
}

// tslint:disable-next-line: no-namespace
export namespace PhoneNumber {
	export function is(value: PhoneNumber | any): value is PhoneNumber {
		return typeof value == "object" &&
			/^\d{1,3}$/.test(value.cc) &&
			/^\d{1,12}$/.test(value.subscriber)
	}
}
