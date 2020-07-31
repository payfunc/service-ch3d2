export interface DeviceRenderOptions {
	sdkInterface?: "01" | "02" | "03"
	sdkUiType?: ("01" | "02" | "03" | "04" | "05")[]
}

// tslint:disable-next-line: no-namespace
export namespace DeviceRenderOptions {
	export function is(value: DeviceRenderOptions | any): value is DeviceRenderOptions {
		return typeof value == "object" &&
			(value.sdkInterface == undefined || value.sdkInterface == "01" || value.sdkInterface == "02" || value.sdkInterface == "03") &&
			(value.sdkUiType == undefined || Array.isArray(value.sdkUiType) && value.sdkUiType && value.sdkUiType.every((type: any) => type == "01" || type == "02" || type == "03" || type == "04" || type == "05"))
	}
}
