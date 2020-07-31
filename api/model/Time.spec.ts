import * as isoly from "isoly"
import { Time } from "./Time"

describe("service.ch3d2.api.model.Time is", () => {
	it("service.ch3d2.api.model.Time is", () => {
		const validTimes = [
			"000001010000", "199901100059", "500001202300", "999901302359", "201612312400",
			"202001310101", "202002291212", "202003312323", "202004301334", "202005311545", "202006302356", "202007310559", "202008311331", "202009301234", "202010311758", "202011300001", "202012311012"
		]
		expect(Array.isArray(validTimes) && validTimes.every(Time.is)).toBeTruthy()
	})
	it("service.ch3d2.api.model.Time is invalid", () => {
		const invalidTimes = [
			"20200131010", "202001316000", "202001310060", "202001316589", "2020013101011"
		]
		expect(Array.isArray(invalidTimes) && invalidTimes.every(time => !Time.is(time))).toBeTruthy()
	})
	it("testing from", () => {
		expect(Time.is(Time.from(isoly.DateTime.now()))).toBeTruthy()
	})
})
