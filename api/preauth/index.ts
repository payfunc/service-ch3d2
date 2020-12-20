import * as gracely from "gracely"
import * as authly from "authly"
import { Configuration } from "../Configuration"
import { Error } from "../Error"
import * as connection from "../post"
import { Request } from "./Request"
import { Response } from "./Response"

async function post(configuration: Configuration, token: authly.Token): Promise<Response | Error | gracely.Error> {
	return connection.post<Request, Response | Error | gracely.Error>(configuration, `card/${token}/ch3d2/preauth`, {})
}

export { Request, Response, post }
