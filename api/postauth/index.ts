import * as gracely from "gracely"
import { Request } from "./Request"
import { Response } from "./Response"
import { Error } from "../Error"
import { Configuration } from "../Configuration"
import * as connection from "../post"

async function post(configuration: Configuration, request: Request): Promise<Response | Error | gracely.Error> {
	return connection.post<Request, Response | Error | gracely.Error>(configuration, "postauth", request)
}

export {
	Request,
	Response,
	post,
}
