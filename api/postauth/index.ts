import * as gracely from "gracely"
import * as authly from "authly"
import * as card from "@payfunc/model-card"
import { Configuration } from "../Configuration"
import { Error } from "../Error"
import * as connection from "../post"
import { Request } from "./Request"
import { Response } from "./Response"

async function post(
	configuration: Configuration,
	request: Request,
	token: authly.Token
): Promise<Response | Error | gracely.Error> {
	const path = card.Card.Token.verify(token) ? `card/ch3d2/${token}/` : `card/${token}/ch3d2/`
	return connection.post<Request, Response | Error | gracely.Error>(configuration, path + `postauth`, request)
}

export { Request, Response, post }
