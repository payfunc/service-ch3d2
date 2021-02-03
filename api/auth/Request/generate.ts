import * as isoly from "isoly"
import * as model from "@payfunc/model"
import * as api from "../../../api"

export function generate(
	notificationURL: string,
	transactionId: string,
	amount: number,
	currency: isoly.Currency,
	type: "create account" | "account" | "card",
	browser?: model.Browser,
	customer?: model.Customer
): api.auth.Request {
	let authRequest: api.auth.Request = {
		deviceChannel: "02",
		messageCategory: type != "create account" ? "01" : "02",
		messageType: "AReq",
		messageVersion: "2.1.0",
		threeDSRequestorURL: "https://payfunc.com/about/contact/",
		threeDSServerTransID: transactionId,
		threeDSRequestorAuthenticationInd:
			type == "account"
				? "02" // Recurring transaction
				: type == "create account"
				? "04" // Add card
				: "01",
		threeDSCompInd: "Y",
		transType: "01",
	}
	if (type != "create account") {
		const decimals = isoly.Currency.decimalDigits(currency) ?? 0
		authRequest.purchaseAmount = Math.round(amount * 10 ** decimals).toString()
		authRequest.purchaseCurrency = isoly.CurrencyCode.from(currency)
		authRequest.purchaseExponent = decimals.toString()
		authRequest.purchaseDate = api.model.PreciseTime.from(isoly.DateTime.now())
		if (type == "card" && authRequest.deviceChannel != "03")
			authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge as auth is only run when additional verification is required.
	} else
		authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge when creating an account.
	authRequest = appendCustomerData(customer, authRequest)
	if (browser)
		authRequest = {
			...authRequest,
			...api.convert.convertBrowser(browser, authRequest.messageVersion),
			notificationURL,
		}
	return authRequest
}
function appendCustomerData(customer: model.Customer | undefined, authRequest: api.auth.Request) {
	if (customer) {
		if (customer.address)
			authRequest = { ...authRequest, ...api.convert.convertAddress(customer.address) }
		if (customer.email) {
			const email = model.EmailAddresses.get(customer.email, "primary", "billing")
			if (email)
				authRequest.email = email
		}
		if (customer.phone) {
			authRequest = {
				...authRequest,
				...api.convert.convertPhone(customer.phone, customer.address),
			}
		}
	}
	return authRequest
}
