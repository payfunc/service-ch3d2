import * as isoly from "isoly"
import * as model from "@payfunc/model"
import { Request as AuthRequest } from "../auth"

export function convertAddress(input: model.Address | model.Addresses): Partial<AuthRequest> {
	const billingAddress = model.Address.is(input)
		? input
		: input.billing ?? input.primary ?? input.delivery ?? input.visit ?? model.Address.create("SV")
	const deliveryAddress = model.Address.is(input)
		? input
		: input.delivery ?? input.visit ?? input.primary ?? input.billing ?? model.Address.create("SV")
	const addrMatch =
		model.Address.is(input) ||
		(billingAddress.city.trim().toLocaleLowerCase() == deliveryAddress.city.trim().toLocaleLowerCase() &&
			billingAddress.countryCode == deliveryAddress.countryCode &&
			billingAddress.street.trim().toLocaleLowerCase() == deliveryAddress.street.trim().toLocaleLowerCase() &&
			billingAddress.zipCode.trim().toLocaleLowerCase() == deliveryAddress.zipCode.trim().toLocaleLowerCase())
			? "Y"
			: "N"
	const result: Partial<AuthRequest> = {
		billAddrCity: billingAddress.city,
		billAddrCountry: isoly.CountryCode.Alpha3.from(billingAddress.countryCode),
		billAddrLine1: billingAddress.street,
		billAddrLine2: "",
		billAddrLine3: "",
		billAddrPostCode: billingAddress.zipCode,
		billAddrState: "",
		shipAddrCity: deliveryAddress.city,
		shipAddrCountry: isoly.CountryCode.Alpha3.from(deliveryAddress.countryCode),
		shipAddrLine1: deliveryAddress.street,
		shipAddrLine2: "",
		shipAddrLine3: "",
		shipAddrPostCode: deliveryAddress.zipCode,
		shipAddrState: "",
		addrMatch,
	}
	return AuthRequest.limit(result)
}
