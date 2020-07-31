export type ValidVersion = "2.1.0" | "2.2.0"

// tslint:disable-next-line: no-namespace
export namespace ValidVersion {
	export function is(value: ValidVersion | any): value is ValidVersion {
		return value == "2.1.0" || value == "2.2.0"
	}
}
