import * as isoly from "isoly"
import * as model from "@payfunc/model"
import * as api from "../index"

export function convertPhone(phone: string | model.PhoneNumbers | undefined): Partial<api.auth.Request> {
	const authRequest: Partial<api.auth.Request> = {}
	let number
	if ((number = extractPhoneNumber(phone, "landline")))
		authRequest.homePhone = number
	if ((number = extractPhoneNumber(phone, "primary")))
		authRequest.workPhone = number
	if ((number = extractPhoneNumber(phone, "cellphone")))
		authRequest.mobilePhone = number
	return authRequest
}

function extractPhoneNumber(
	email: string | model.EmailAddresses | undefined,
	type: model.PhoneNumbers.Type
): api.model.PhoneNumber | undefined {
	let result: api.model.PhoneNumber | undefined
	const phone = model.PhoneNumbers.get(email, type)
	if (phone) {
		const split = isoly.CallingCode.seperate(phone)
		result = { cc: split[0] ?? "", subscriber: split[1] }
	}
	return result
}
