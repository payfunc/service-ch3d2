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
	if (phone && phone.startsWith("+46") && phone.length > 3)
		result = { cc: "+46", subscriber: phone.substring(3, phone.length) }
	return result
}
