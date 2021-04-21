import * as gracely from "gracely"
import * as authly from "authly"
import { Configuration } from "./Configuration"

export async function post<Request, Response>(
	configuration: Configuration,
	endpoint: string,
	request: Request,
	id: authly.Identifier
): Promise<Response> {
	const response = await fetch(configuration.url + "/" + endpoint + "&id=" + encodeURIComponent(id), {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8", authorization: "Bearer " + configuration.key },
		body: JSON.stringify(request),
	}).catch(_ => undefined)
	return !response
		? gracely.server.unavailable()
		: response.headers.get("Content-Type")?.startsWith("application/json")
		? response.json()
		: response.text()
}
