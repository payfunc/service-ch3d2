import { PhoneNumber } from "./PhoneNumber"

describe("service.ch3d2.api.model.PhoneNumber is", () => {
	it("service.ch3d2.api.model.PhoneNumber is", () => expect(PhoneNumber.is({cc: "46", subscriber: "1234567890"})).toBeTruthy())
	it("service.ch3d2.api.model.PhoneNumber is not #1", () => expect(PhoneNumber.is({cc: "", subscriber: "1234567890"})).toBeFalsy())
	it("service.ch3d2.api.model.PhoneNumber is not #2", () => expect(PhoneNumber.is({cc: "46", subscriber: ""})).toBeFalsy())
	it("service.ch3d2.api.model.PhoneNumber is not #3", () => expect(PhoneNumber.is({subscriber: "1234567890"})).toBeFalsy())
	it("service.ch3d2.api.model.PhoneNumber is not #4", () => expect(PhoneNumber.is({cc: "46"})).toBeFalsy())
	it("service.ch3d2.api.model.PhoneNumber is not #5", () => expect(PhoneNumber.is({cc: "1234", subscriber: "1234567890"})).toBeFalsy())
	it("service.ch3d2.api.model.PhoneNumber is not #6", () => expect(PhoneNumber.is({cc: "46", subscriber: "123456789012345"})).toBeFalsy())
})
