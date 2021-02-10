import * as phoneNumber from "./phoneNumber"
describe("phoneNumber", () => {
	it("extract", () => {
		expect(phoneNumber.extractPhoneNumber("+49 1 2 3 4 5 6 7 8 9 0", "landline")).toEqual({
			cc: "49",
			subscriber: "1234567890",
		})
		expect(phoneNumber.extractPhoneNumber("+49 1-2-3-4 5 6 7 8 9 0", "landline")).toEqual({
			cc: "49",
			subscriber: "1234567890",
		})
		expect(
			phoneNumber.extractPhoneNumber(
				"+49 Replace everything that is not a digit or a plus!#¤%&/()=?ÅÄAS;NNXBVHFAQ 123",
				"landline"
			)
		).toEqual({
			cc: "49",
			subscriber: "123",
		})
	})
})
