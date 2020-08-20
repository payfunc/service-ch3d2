import * as isoly from "isoly"
import { Date } from "./Date"

describe("service.ch3d2.api.model.Date is", () => {
	it("service.ch3d2.api.model.Date is", () => {
		const validDates = [
			"00000101",
			"19990110",
			"50000120",
			"99990130",
			"20200131",
			"20200229",
			"20200331",
			"20200430",
			"20200531",
			"20200630",
			"20200731",
			"20200831",
			"20200930",
			"20201031",
			"20201130",
			"20201231",
		]
		expect(Array.isArray(validDates) && validDates.every(Date.is)).toBeTruthy()
	})
	it("service.ch3d2.api.model.Date is invalid", () => {
		const invalidDates = [
			"00000000",
			"20200000",
			"20200001",
			"20200100",
			"20200231",
			"20200132",
			"20200230",
			"20200332",
			"20200431",
			"20200532",
			"20200631",
			"20200732",
			"20200832",
			"20200931",
			"20201032",
			"20201131",
			"20201232",
		]
		expect(Array.isArray(invalidDates) && invalidDates.every(date => !Date.is(date))).toBeTruthy()
	})
	it("testing from", () => {
		expect(Date.is(Date.from(isoly.DateTime.now()))).toBeTruthy()
	})
})
