import * as authly from "authly"
import * as gracely from "gracely"
import { Request } from "./Request"
import { Response } from "./Response"
import { Configuration } from "../Configuration"
import { post as cardfuncPost } from "../Cardfunc"

async function post(configuration: Configuration, request: Request, token: authly.Token): Promise<Response | gracely.Error> {
	return cardfuncPost(configuration, `card/${ token }/ch3d2/preauth`, request)
}

export {
	Request,
	Response,
	post,
}
