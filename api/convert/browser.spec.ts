import * as cardModel from "@payfunc/model-card"
import * as model from "@payfunc/model"
import { Request } from "../auth"
import * as browserApi from "./browser"

describe("browser tests", () => {
	it("convertBrowser tests", () => {
		const merchant: model.Key & { card: cardModel.Merchant.Card } = {
			aud: "public",
			iat: 1610963935,
			iss: "http://localhost:7071",
			sub: "testtest",
			name: "Test Merchant",
			url: "http://example.com",
			token: "not.important.here",
			card: {
				url: "http://localhost:7082",
				id: "test",
				country: "SE",
				acquirer: {
					url: "https://not.important.here/3d",
					key: "example-key",
					protocol: "clearhaus",
					bin: {
						mastercard: "1234",
						visa: "1234",
					},
				},
			},
		}
		const card: cardModel.Card.Token = {
			card: "12345678",
			type: "single use",
			expires: [12, 28],
			iin: "123456",
			last4: "1234",
			scheme: "visa",
		}
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
			browserLanguage: "sv-SE",
			browserScreenHeight: "1080",
			browserScreenWidth: "1920",
			browserTZ: "60",
			notificationURL:
				"http://localhost:7082/card/12345678/verification?mode=iframe&merchant=test&parent=https%3A%2F%2Fcheckout.payfunc.com",
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
		expect(browserApi.convertBrowser(merchant, card, browserCreatable)).toEqual(creatableOutput)
		expect(browserApi.convertBrowser(merchant, card, { ...browserCreatable, colorDepth: 30 })).toEqual({
			...creatableOutput,
			browserColorDepth: "24",
		})
		expect(browserApi.convertBrowser(merchant, card, browser)).toEqual(output)
		expect(browserApi.convertBrowser(merchant, card, browser220, "2.1.0")).toEqual(output)
		expect(browserApi.convertBrowser(merchant, card, browser220, "2.2.0")).toEqual(output220)
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
