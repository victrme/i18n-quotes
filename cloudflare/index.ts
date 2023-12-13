import { Quote, getQuoteTypeFromURL, getRandomSample } from '../src/funcs'
import inspirobot from '../src/inspirobot'

const headers: HeadersInit = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
}

export default {
	async fetch(req: Request, _: any, ctx: ExecutionContext): Promise<Response> {
		const which = getQuoteTypeFromURL(req.url)

		switch (which.type) {
			case 'classic': {
				const full = await cacheControl(ctx, which.lang)
				return new Response(JSON.stringify(getRandomSample(full)), { headers })
			}

			case 'kaamelott': {
				const full = await cacheControl(ctx, 'kaamelott')
				return new Response(JSON.stringify(getRandomSample(full)), { headers })
			}

			case 'inspirobot': {
				const resp = await inspirobot()
				return new Response(JSON.stringify(resp), { headers })
			}

			default:
				return new Response('Not found', {
					status: 404,
					headers,
				})
		}
	},
}

async function cacheControl(ctx: ExecutionContext, query: string): Promise<Quote[]> {
	const url = 'https://raw.githubusercontent.com/victrme/i18n-quotes/main/quotes/' + query + '.json?v=0.0.0'
	const cacheKey = new Request(url)
	const cache = caches.default
	let response = await cache.match(cacheKey)

	if (!response) {
		response = await fetch(url)
		response = new Response(response.body, response)
		response.headers.append('Cache-Control', 's-maxage=86400')

		ctx.waitUntil(cache.put(cacheKey, response.clone()))
	}

	return response.json<Quote[]>()
}
