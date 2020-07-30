import { AcsRenderingType } from "./AcsRenderingType"

describe("service.ch3d2.api.model.AcsRenderingType is", () => {
	it("service.ch3d2.api.model.AcsRenderingType is #1", () => expect(AcsRenderingType.is({ acsInterface: "02", acsUiTemplate: "05" })).toBeTruthy())
	it("service.ch3d2.api.model.AcsRenderingType is not #1", () => expect(AcsRenderingType.is({ acsInterface: "03", acsUiTemplate: "04" })).toBeFalsy())
	it("service.ch3d2.api.model.AcsRenderingType is not #2", () => expect(AcsRenderingType.is({ acsInterface: "", acsUiTemplate: "03" })).toBeFalsy())
	it("service.ch3d2.api.model.AcsRenderingType is not #3", () => expect(AcsRenderingType.is({ acsInterface: "01", acsUiTemplate: "00" })).toBeFalsy())
	it("service.ch3d2.api.model.AcsRenderingType is not #4", () => expect(AcsRenderingType.is({ acsInterface: "01", acsUiTemplate: "1" })).toBeFalsy())
	it("service.ch3d2.api.model.AcsRenderingType is not #5", () => expect(AcsRenderingType.is({ acsInterface: "01" })).toBeFalsy())
	it("service.ch3d2.api.model.AcsRenderingType is not #6", () => expect(AcsRenderingType.is({ acsUiTemplate: "03" })).toBeFalsy())
})
