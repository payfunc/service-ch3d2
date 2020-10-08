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
	const addrMatch = addressesMatching(input, billingAddress, deliveryAddress)
	let result: Partial<AuthRequest> = {
		addrMatch,
		billAddrCity: billingAddress.city,
		billAddrCountry:
			billingAddress.countryCode != "" ? isoly.CountryCode.Numeric.from(billingAddress.countryCode).toString() : "",
		billAddrLine1: billingAddress.street ?? (model.Address.General.is(billingAddress) ? billingAddress.address1 : ""),
		billAddrLine2: model.Address.General.is(billingAddress) && billingAddress.address2 ? billingAddress.address2 : "",
		billAddrLine3: model.Address.General.is(billingAddress) && billingAddress.address3 ? billingAddress.address3 : "",
		billAddrPostCode: billingAddress.zipCode,
		billAddrState: typeof (billingAddress as any).state == "string" ? (billingAddress as any).state : "",
	}
	result = {
		...result,
		shipAddrCity: deliveryAddress.city,
		shipAddrCountry:
			deliveryAddress.countryCode != "" ? isoly.CountryCode.Numeric.from(deliveryAddress.countryCode).toString() : "",
		shipAddrLine1:
			deliveryAddress.street ?? (model.Address.General.is(deliveryAddress) ? deliveryAddress.address1 : ""),
		shipAddrLine2:
			model.Address.General.is(deliveryAddress) && deliveryAddress.address2 ? deliveryAddress.address2 : "",
		shipAddrLine3:
			model.Address.General.is(deliveryAddress) && deliveryAddress.address3 ? deliveryAddress.address3 : "",
		shipAddrPostCode: deliveryAddress.zipCode,
		shipAddrState: typeof (deliveryAddress as any).state == "string" ? (deliveryAddress as any).state : "",
	}
	return AuthRequest.limit(result)
}

export function addressesMatching(
	input: model.Address | model.Addresses,
	billingAddress: model.Address,
	deliveryAddress: model.Address
) {
	return model.Address.is(input) ||
		(billingAddress.city?.trim().toLocaleLowerCase() == deliveryAddress.city?.trim().toLocaleLowerCase() &&
			billingAddress.countryCode == deliveryAddress.countryCode &&
			billingAddress.street?.trim().toLocaleLowerCase() == deliveryAddress.street?.trim().toLocaleLowerCase() &&
			billingAddress.zipCode?.trim().toLocaleLowerCase() == deliveryAddress.zipCode?.trim().toLocaleLowerCase() &&
			(((billingAddress as any).state == undefined && (deliveryAddress as any).state == undefined) ||
				(typeof (billingAddress as any).state == "string" &&
					typeof (deliveryAddress as any).state == "string" &&
					(billingAddress as any).state?.trim().toLocaleLowerCase() ==
						(deliveryAddress as any).state?.trim().toLocaleLowerCase())) &&
			((!model.Address.General.is(billingAddress) && !model.Address.General.is(deliveryAddress)) ||
				(model.Address.General.is(billingAddress) &&
					model.Address.General.is(deliveryAddress) &&
					billingAddress.address1?.trim().toLocaleLowerCase() == deliveryAddress.address1?.trim().toLocaleLowerCase() &&
					billingAddress.address2?.trim().toLocaleLowerCase() == deliveryAddress.address2?.trim().toLocaleLowerCase() &&
					billingAddress.address3?.trim().toLocaleLowerCase() == deliveryAddress.address3?.trim().toLocaleLowerCase())))
		? "Y"
		: "N"
}
