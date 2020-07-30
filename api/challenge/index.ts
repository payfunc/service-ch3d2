import * as gracely from "gracely"
import { Request } from "./Request"
import { Response } from "./Response"
import { Configuration } from "../Configuration"
import * as connection from "../post"

async function post(configuration: Configuration, request: Request): Promise<Response | gracely.Error> {
	return connection.post(configuration, "preauth", request)
}

export {
	Request,
	Response,
	post,
}
