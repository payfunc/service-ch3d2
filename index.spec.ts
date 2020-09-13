import * as ch3d2 from "./index"

describe("service-ch3d2", () => {
	it("test accessibility or (minimum of one test is required)", () => {
		ch3d2.api.preauth.Request.is({})
		ch3d2.api.auth.Request.limit({})
		ch3d2.api.preauth.Response.is({})
		ch3d2.api.postauth.Request.is({})
		const ch3d2CallFunctions = [ch3d2.preauth, ch3d2.auth, ch3d2.postauth]
		ch3d2.api.model.Currency.is("752")
		ch3d2.api.Error.is({})
		ch3d2.api.challenge.Request.is({})
		ch3d2.api.challenge.Response.is({})
	})
	it("verify test", async () => {
		const verifierCreateRequest = ch3d2.Verifier.Request.create(
			{
				currency: "SEK",
				id: "YqRuY4CQO1bhhnKZ",
				items: [
					{
						name: "test, if live cancel",
						number: "test, if live cancel",
						price: 400,
						quantity: 1,
						vat: 0,
					},
				],
				number: "oK3FrfjkXNpV",
				payment: {
					type: "card",
					card:
						"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkZnVuYyIsImlhdCI6MTU5OTE0MjA2NjMxOCwiYXVkIjoicHJvZHVjdGlvbiIsInNjaGVtZSI6InVua25vd24iLCJpaW4iOiI5MDAwMTAiLCJsYXN0NCI6IjExMTEiLCJleHBpcmVzIjpbMTIsODhdLCJ0eXBlIjoic2luZ2xlIHVzZSIsImNhcmQiOiJPRUVBS0dDRiJ9.JsLVvDHSbfyPpr98vUbVt8qElLLAOlEpSmOJ14kecgd2G1XNIeAZmzjyqlTbKinFiL74ZQ0XoMkuPObGZzbx9M61WvIGsasw0PebRlOF7-oSILw4VvHiBb2wPB_RxN1PAKNKAHmNwP8i_NRs2WR7syEoGDNygE696UZ09KAKYqY2b13bzjPbZjQIOLcEFQNeTlT8p_AgdJIP1gPbiNjp3Q272EP5bVINkydSGQNayXRSJbQKMCrtPpD6snlk4Ej2O_FyU46PfCeUiN9EXkbXUsV2rcIjjDIomhSmeqH6c6upNbusJzzXDYn1xVjDogN8Bp-jjlTALp5KIBVbACIKSQ",
				},
			},
			{ ip: undefined }
		)
		const verifier = new ch3d2.Verifier()
		const verifyResponse = await verifier.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5wYXlmdW5jLmNvbSIsImlhdCI6MTU4MzkzNTQ1NjE3MSwic3ViIjoidGVzdHRlc3QiLCJhZ2VudCI6IlBheUZ1bmMiLCJ0eXBlIjoidGVzdCIsImlkIjoidGVzdHRlc3QiLCJuYW1lIjoiVGVzdCBBQiIsImxvZ290eXBlIjoiaHR0cHM6Ly9icmFuZC5wYXlmdW5jLmNvbS9sb2dvL3BuZy05MC9wYXlmdW5jLWwwOC05MC5wbmciLCJ0ZXJtcyI6Imh0dHBzOi8vcGF5ZnVuYy5jb20vYWJvdXQiLCJvcHRpb24iOnsiY2FyZCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzVqWVhKa1puVnVZeTVqYjIwaUxDSnBZWFFpT2pFMU9ETTFNRE15T1RBNU9EVXNJbUYxWkNJNkluQjFZbXhwWXlJc0luTjFZaUk2SW5SbGMzUWlMQ0poWjJWdWRDSTZJbEJoZVVaMWJtTWlMQ0owZVhCbElqb2lkR1Z6ZENJc0ltbGtJam9pZEdWemRDSXNJbTVoYldVaU9pSlVaWE4wSUVGQ0lpd2lkWEpzSWpvaWFIUjBjRG92TDJWNFlXMXdiR1V1WTI5dElpd2laR1Z6WTNKcGNIUnZjaUk2SW5SbGMzUWdkSEpoYm5OaFkzUnBiMjRpTENKamIzVnVkSEo1SWpvaVUwVWlMQ0poWTNGMWFYSmxjaUk2SWpGcWRXSnpRVUUyZWpGUGFETlhhMkp4VmxoVFYwZFRaVlIyWW1zM01WOTVibTVFYmtsdWFsSXhkaTFuT0RBM2RrWkZjbWhPWWsxVFFVVmxkMngzVmtjMk5ubzJUamt3WkRSbVUyWnpZMmhzTW1oblZXNVhNR2xNUTBweVdsaHJhVTlwU1hwT2JWVXpUa2RGTWs5VE1ETmFiVlpzVEZSU2FFMTZZM1JaYlU1clQxTXdNbGxVUlRCTmFrbDNUV3BvYlZwcVRXbE1RMHBwWVZjMGFVOXVjMmxrYld4NldWTkpOa2xxVVhwUFJFMTNUMU5KYzBsdE1XaGpNMUpzWTIxT2FHTnRVV2xQYVVreFRXcFpNVTU2UldsbVdEQWlMQ0p0YVdRaU9pSXhNak0wSWl3aWJXTmpJam9pTVRJek5DSXNJbVZ0ZGpOa0lqb2lUR0ZVUkdkSmRYRXdiWEV6WmxkR04wWTFObGRLWlVObmVUZE1RVTVFUXpadGNHbEJOMDlPV0hKblZHeGZUVlkyVWs1WllURnZiRE5mVm14WVlteGhWelp1T1dwR2IwTXRVRkpxTlZCRGVrcGFWVEY1WkVkV05VbHFiMmxpYlRoMFlUSldOVWx1TUNKOS5YZ2pyb1JsOWJXVzRNSl83Z1NJQVBPeGpZRXgyWTlfNzgzOGp0MWtxb01vIiwiZW1haWwiOiI1bXdpeTh3bHlDUy1PQTlkaURoekQxN1FLZVc5T2NkTTBpU01vZ193dmFUQ0g0d0hTVXZrem1lRTZmS1RIaGRxaUFKM2tDTmFLUU1fZFRQaWt4UENlbWRwTFhsNE0zQnJOWEJEZFVFaWZRIn0sImF1ZCI6InB1YmxpYyJ9.JYSWGVwPoyrofn0twsNMkZ8bI7yyM4DfcJd9SltIgZ4",
			verifierCreateRequest,
			true
		)
		expect(verifyResponse).toEqual({ result: "success", type: "unverified" })
	})
})
