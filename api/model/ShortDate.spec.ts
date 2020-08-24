import * as isoly from "isoly"
import { ShortDate } from "./ShortDate"

describe("service.ch3d2.api.model.ShortDate is", () => {
	it("service.ch3d2.api.model.ShortDate is", () => {
		const validShortDates = [
			"0001",
			"1102",
			"2203",
			"3304",
			"4405",
			"5506",
			"6607",
			"7708",
			"8809",
			"9910",
			"2011",
			"2012",
		]
		expect(Array.isArray(validShortDates) && validShortDates.every(ShortDate.is)).toBeTruthy()
	})
	it("service.ch3d2.api.model.ShortDate is invalid", () => {
		const invalidShortDates = ["2000", "2013", "10001"]
		expect(Array.isArray(invalidShortDates) && invalidShortDates.every(date => !ShortDate.is(date))).toBeTruthy()
	})
	it("testing from", () => {
		expect(ShortDate.is(ShortDate.from(isoly.DateTime.now()))).toBeTruthy()
	})
})
