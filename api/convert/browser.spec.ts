import * as model from "@payfunc/model"
import { Request } from "../auth"
import * as browserApi from "./browser"

describe("browser tests", () => {
	it("convertBrowser tests", () => {
		const browserCreatable: model.Browser.Creatable = {
			colorDepth: 32,
			java: false,
			locale: "sv-SE",
			parent: "https://checkout.payfunc.com",
			resolution: [1920, 1080],
			timezone: 60,
		}
		const browser: model.Browser = {
			...browserCreatable,
			acceptHeader: "test/data",
			userAgent: "testBrowser",
		}
		const browser220: model.Browser = {
			...browser,
			javascript: true,
		}
		const creatableOutput: Partial<Request> = {
			browserColorDepth: "32",
			browserJavaEnabled: false,
			browserJavascriptEnabled: true,
			browserLanguage: "sv-SE",
			browserScreenHeight: "1080",
			browserScreenWidth: "1920",
			browserTZ: "60",
		}
		const output: Partial<Request> = {
			...creatableOutput,
			browserAcceptHeader: "test/data",
			browserUserAgent: "testBrowser",
		}
		const output220: Partial<Request> = {
			...output,
			browserJavascriptEnabled: true,
		}
		expect(browserApi.convertBrowser(browserCreatable)).toEqual(creatableOutput)
		expect(browserApi.convertBrowser({ ...browserCreatable, colorDepth: 30 })).toEqual({
			...creatableOutput,
			browserColorDepth: "24",
		})
		expect(browserApi.convertBrowser(browser)).toEqual(output)
		expect(browserApi.convertBrowser(browser220, "2.1.0")).toEqual(output)
		expect(browserApi.convertBrowser(browser220, "2.2.0")).toEqual(output220)
	})
	it("colorDepth tests", () => {
		expect(browserApi.getColorDepth(NaN)).toEqual("24")
		expect(browserApi.getColorDepth(0.5)).toEqual("24")
		expect(browserApi.getColorDepth(1)).toEqual("1")
		expect(browserApi.getColorDepth(3.5)).toEqual("1")
		expect(browserApi.getColorDepth(4)).toEqual("4")
		expect(browserApi.getColorDepth(4.5)).toEqual("4")
		expect(browserApi.getColorDepth(8)).toEqual("8")
		expect(browserApi.getColorDepth(9.5)).toEqual("8")
		expect(browserApi.getColorDepth(15)).toEqual("15")
		expect(browserApi.getColorDepth(15.9)).toEqual("15")
		expect(browserApi.getColorDepth(16)).toEqual("16")
		expect(browserApi.getColorDepth(16.9)).toEqual("16")
		expect(browserApi.getColorDepth(24)).toEqual("24")
		expect(browserApi.getColorDepth(27)).toEqual("24")
		expect(browserApi.getColorDepth(32)).toEqual("32")
		expect(browserApi.getColorDepth(38)).toEqual("32")
		expect(browserApi.getColorDepth(48)).toEqual("48")
		expect(browserApi.getColorDepth(49)).toEqual("48")
		expect(browserApi.getColorDepth(50.9)).toEqual("48")
	})
})
