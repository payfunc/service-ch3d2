import * as isoly from "isoly"
import * as card from "@payfunc/model-card"
import * as model from "@payfunc/model"
import * as api from "../../../api"

export function generate(
	request: model.PaymentVerifier.Request,
	cardToken: card.Card.Token,
	threeDSServerTransID: string
) {
	const paymentType: "card" | "account" | "create account" =
		request.payment.type == "account" && model.Item.amount(request.items) == 0
			? "create account"
			: cardToken.type == "recurring"
			? "account"
			: "card"
	let authRequest: api.auth.Request = {
		deviceChannel: "02",
		messageCategory: paymentType != "create account" ? "01" : "02",
		messageType: "AReq",
		messageVersion: "2.1.0",
		threeDSRequestorURL: "https://payfunc.com/about/contact/",
		threeDSServerTransID,
		threeDSRequestorAuthenticationInd:
			paymentType == "account"
				? "02" // Recurring transaction
				: paymentType == "create account"
				? "04" // Add card
				: "01",
		threeDSCompInd: "Y",
		transType: "01",
	}
	if (paymentType != "create account") {
		const decimals = isoly.Currency.decimalDigits(request.currency) ?? 0
		const amount = Math.round(
			model.Item.amount(request.payment.type == "card" ? request.payment.amount ?? request.items : request.items) *
				10 ** decimals
		)
		authRequest.purchaseAmount = amount.toString()
		authRequest.purchaseCurrency = isoly.CurrencyCode.from(request.currency)
		authRequest.purchaseExponent = decimals.toString()
		authRequest.purchaseDate = api.model.PreciseTime.from(isoly.DateTime.now())
		if (paymentType == "card" && authRequest.deviceChannel != "03")
			authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge as auth is only run when additional verification is required.
	} else
		authRequest.threeDSRequestorChallengeInd = "04" // "04" - We require challenge when creating an account.
	authRequest = appendCustomerData(request.customer, authRequest)
	if (
		request.payment.type == "card" &&
		model.Payment.Card.Creatable.is(request.payment) &&
		request.payment.client?.browser
	)
		authRequest = {
			...authRequest,
			...api.convert.convertBrowser(request.payment.client.browser, authRequest.messageVersion),
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
