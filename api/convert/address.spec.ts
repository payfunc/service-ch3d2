import * as model from "@payfunc/model"
import * as addressApi from "./address"

describe("address tests", () => {
	it("address matching", () => {
		const addressGeneral: model.Address.General = {
			street: "Vägvägen 1",
			zipCode: "12345",
			countryCode: "",
		}
		const addresses: model.Addresses = {
			delivery: addressGeneral,
			primary: addressGeneral,
		}
		expect(model.Address.General.is(addressGeneral)).toBeTruthy()
		expect(model.Address.General.is(addressGeneral)).toBeTruthy()
		expect(addressApi.addressesMatching(addresses, addressGeneral, addressGeneral)).toEqual("Y")
	})
	it("address matching 2", () => {
		const addressGeneral: model.Address.General = {
			street: "Vägvägen 1",
			zipCode: "12345",
			countryCode: "SE",
			address1: "row",
			address2: "row",
			address3: "row",
			city: "city",
		}
		const addresses: model.Addresses = {
			delivery: addressGeneral,
			primary: addressGeneral,
		}
		expect(model.Address.General.is(addressGeneral)).toBeTruthy()
		expect(model.Address.General.is(addressGeneral)).toBeTruthy()
		expect(addressApi.addressesMatching(addresses, addressGeneral, addressGeneral)).toEqual("Y")
		expect(addressApi.convertAddress(addresses)).toEqual({
			addrMatch: "Y",
			billAddrCity: "city",
			billAddrCountry: "752",
			billAddrLine1: "Vägvägen 1",
			billAddrLine2: "row",
			billAddrLine3: "row",
			billAddrPostCode: "12345",
			shipAddrCity: "city",
			shipAddrCountry: "752",
			shipAddrLine1: "Vägvägen 1",
			shipAddrLine2: "row",
			shipAddrLine3: "row",
			shipAddrPostCode: "12345",
		})
	})
	it("address matching 2", () => {
		const address1: model.Address = {
			street: "Road 1",
			zipCode: "12345",
			countryCode: "DE",
			city: "city",
		}
		const address2: model.Address.DE = {
			street: "Road 1",
			zipCode: "12345",
			countryCode: "DE",
			city: "city",
			state: "Bayern",
		}
		const addresses: model.Addresses = {
			billing: address1,
			visit: address2,
		}
		expect(model.Address.is(address1)).toBeTruthy()
		expect(model.Address.DE.is(address2)).toBeTruthy()
		expect(addressApi.addressesMatching(addresses, address1, address2)).toEqual("N")
		expect(addressApi.convertAddress(addresses)).toEqual({
			addrMatch: "N",
			billAddrCity: "city",
			billAddrCountry: "276",
			billAddrLine1: "Road 1",
			billAddrLine2: "",
			billAddrLine3: "",
			billAddrPostCode: "12345",
			shipAddrCity: "city",
			shipAddrCountry: "276",
			shipAddrLine1: "Road 1",
			shipAddrLine2: "",
			shipAddrLine3: "",
			shipAddrPostCode: "12345",
		})
	})
})
