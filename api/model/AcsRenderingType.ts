export interface AcsRenderingType {
	acsInterface: "01" | "02"
	acsUiTemplate: "01" | "02" | "03" | "04" | "05"
}

// tslint:disable-next-line: no-namespace
export namespace AcsRenderingType {
	export function is(value: AcsRenderingType | any): value is AcsRenderingType {
		return typeof value == "object" &&
			(value.acsInterface == "01" || value.acsInterface == "02") &&
			(value.acsUiTemplate == "01" || value.acsUiTemplate == "02" || value.acsUiTemplate == "03" || value.acsUiTemplate == "04" || value.acsUiTemplate == "05")
	}
}
