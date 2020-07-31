import * as isoly from "isoly"
import { PreciseTime } from "./PreciseTime"

describe("service.ch3d2.api.model.PreciseTime is", () => {
	it("service.ch3d2.api.model.PreciseTime is", () => {
		const validPreciseTimes = [
			"00000101000000", "19990110005911", "50001203230022", "99990130235933", "20161231235960", "20201231240000",
			"20200131010144", "20200229121255", "20200331232356", "20200430003457", "20200531014558", "20200630025659", "20200731035910", "20200831233107", "20200930123424", "20201031175839", "20201130000149", "20201231101232"
		]
		expect(Array.isArray(validPreciseTimes) && validPreciseTimes.every(PreciseTime.is)).toBeTruthy()
	})
	it("service.ch3d2.api.model.PreciseTime is invalid", () => {
		const invalidPreciseTimes = [
			"2020013101010", "20200131000060", "20200131000079", "20200131000099", "202001310101011", "20201231240001",
		]
		expect(Array.isArray(invalidPreciseTimes) && invalidPreciseTimes.every(time => !PreciseTime.is(time))).toBeTruthy()
	})
	it("testing from", () => {
		expect(PreciseTime.is(PreciseTime.from(isoly.DateTime.now()))).toBeTruthy()
	})
})
