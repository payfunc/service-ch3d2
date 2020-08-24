import { DeviceRenderOptions } from "./DeviceRenderOptions"

describe("service.ch3d2.api.model.DeviceRenderOptions is", () => {
	it("service.ch3d2.api.model.DeviceRenderOptions is #1", () =>
		expect(DeviceRenderOptions.is({ sdkInterface: "03", sdkUiType: ["01", "02", "03", "04", "05"] })).toBeTruthy())
	it("service.ch3d2.api.model.DeviceRenderOptions is #2", () =>
		expect(DeviceRenderOptions.is({ sdkInterface: "03" })).toBeTruthy())
	it("service.ch3d2.api.model.DeviceRenderOptions is #3", () =>
		expect(DeviceRenderOptions.is({ sdkUiType: ["05"] })).toBeTruthy())
	it("service.ch3d2.api.model.DeviceRenderOptions is not #1", () =>
		expect(DeviceRenderOptions.is({ sdkInterface: "03", sdkUiType: ["01", "02", "06"] })).toBeFalsy())
	it("service.ch3d2.api.model.DeviceRenderOptions is not #2", () =>
		expect(DeviceRenderOptions.is({ sdkInterface: "", sdkUiType: ["01", "02", "03", "04", "05"] })).toBeFalsy())
	it("service.ch3d2.api.model.DeviceRenderOptions is not #3", () =>
		expect(DeviceRenderOptions.is({ sdkInterface: "04", sdkUiType: ["01", "02", "03", "04", "05"] })).toBeFalsy())
})
