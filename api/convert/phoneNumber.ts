import * as isoly from "isoly"
import * as model from "@payfunc/model"
import * as api from "../index"

export function convertPhone(
	phone: string | model.PhoneNumbers | undefined,
	address?: model.Address | model.Addresses
): Partial<api.auth.Request> {
	const authRequest: Partial<api.auth.Request> = {}
	let number
	if ((number = extractPhoneNumber(phone, "landline", address)))
		authRequest.homePhone = number
	if ((number = extractPhoneNumber(phone, "primary", address)))
		authRequest.workPhone = number
	if ((number = extractPhoneNumber(phone, "cellphone", address)))
		authRequest.mobilePhone = number
	return authRequest
}

function extractPhoneNumber(
	email: string | model.EmailAddresses | undefined,
	type: model.PhoneNumbers.Type,
	address?: model.Address | model.Addresses
): api.model.PhoneNumber | undefined {
	let result: api.model.PhoneNumber | undefined
	const phone = model.PhoneNumbers.get(email, type)
	const mainAddress = model.Addresses.is(address)
		? address.primary ?? address.billing ?? address.delivery ?? address.visit
		: address
	const countryCode: isoly.CountryCode.Alpha2 = model.Address.is(mainAddress)
		? !model.Address.General.is(mainAddress)
			? mainAddress.countryCode
			: "SE"
		: "SE"
	if (phone) {
		const split = isoly.CallingCode.seperate(phone)
		if (split[0] == undefined)
			split[0] = isoly.CallingCode.from(countryCode)
		result = { cc: split[0] ?? "+46", subscriber: split[1] }
	}
	return result
}
