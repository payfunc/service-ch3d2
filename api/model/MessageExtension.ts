export interface MessageExtension {
	criticalityIndicator: boolean
	data: any
	id: string
	name: string
}

// tslint:disable-next-line: no-namespace
export namespace MessageExtension {
	export function is(value: MessageExtension | any): value is MessageExtension {
		return typeof value == "object" &&
			typeof value.criticalityIndicator == "boolean" &&
			value.data != undefined &&
			typeof value.id == "string" && value.id.length <= 64 &&
			typeof value.name == "string" && value.name.length <= 64
	}
}
