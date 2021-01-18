import * as cardModel from "@payfunc/model-card"
import * as model from "@payfunc/model"
import { Request as AuthRequest } from "../auth"

export function convertBrowser(
	merchant: model.Key & { card: cardModel.Merchant.Card },
	card: cardModel.Card.Token,
	browser: model.Browser | model.Browser.Creatable | undefined,
	messageVersion?: "2.1.0" | "2.2.0"
): Partial<AuthRequest> {
	let result: Partial<AuthRequest> = {
		browserColorDepth: browser?.colorDepth ? getColorDepth(browser.colorDepth) : "24",
		browserJavaEnabled: browser?.java ?? false,
		browserLanguage: browser?.locale ?? "en-US",
		browserScreenHeight: getHeight(browser),
		browserScreenWidth: getWidth(browser),
		browserTZ:
			browser?.timezone && browser.timezone.toString().match(/^[+-]?[0-9]{1,4}$/)
				? browser.timezone.toString()
				: "+0000",
		notificationURL:
			merchant.card.url +
			"/card/" +
			card.card +
			"/verification?mode=iframe&merchant=" +
			(merchant.card.id ?? merchant.sub) +
			"&parent=" +
			encodeURIComponent(browser?.parent ?? ""),
	}
	if (messageVersion && messageVersion != "2.1.0")
		result = {
			...result,
			browserJavascriptEnabled: browser?.javascript ?? true,
		}
	if (model.Browser.is(browser)) {
		if (browser.acceptHeader)
			result = { ...result, browserAcceptHeader: browser.acceptHeader }
		if (browser.userAgent)
			result = { ...result, browserUserAgent: browser.userAgent }
	}
	return result
}

function getHeight(browser: model.Browser | model.Browser.Creatable | undefined): string {
	return browser?.resolution ? filterResolution(browser.resolution[1].toString()) : "500"
}

function getWidth(browser: model.Browser | model.Browser.Creatable | undefined): string {
	return browser?.resolution ? filterResolution(browser.resolution[0].toString()) : "500"
}

function filterResolution(input: string): string {
	return input.match(/^[0-9]{1,6}$/) ? input : "500"
}

export function getColorDepth(colorDepth: number): "1" | "4" | "8" | "15" | "16" | "24" | "32" | "48" {
	return colorDepth < 1 || isNaN(colorDepth)
		? "24"
		: colorDepth < 4
		? "1"
		: colorDepth < 8
		? "4"
		: colorDepth < 15
		? "8"
		: colorDepth < 16
		? "15"
		: colorDepth < 24
		? "16"
		: colorDepth < 32
		? "24"
		: colorDepth < 48
		? "32"
		: colorDepth >= 48
		? "48"
		: "24"
}
