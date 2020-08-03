import * as authly from "authly"
import * as gracely from "gracely"
import { Request } from "./Request"
import { Response } from "./Response"
import { Error } from "../Error"
import { Configuration } from "../Configuration"
import { post as cardfuncPost } from "../Cardfunc"

async function post(configuration: Configuration, request: Request, token: authly.Token): Promise<Response | Error | gracely.Error> {
	return cardfuncPost<Request, Response | Error | gracely.Error>(configuration, `card/${ token }/ch3d2/preauth`, request)
}

export {
	Request,
	Response,
	post,
}
