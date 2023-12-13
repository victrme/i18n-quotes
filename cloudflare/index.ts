import getRandomSample from '../src/funcs/getsample'
import isValidLang from '../src/funcs/validlang'
import inspirobot from '../src/funcs/inspirobot'

import type Quotes from '../src/types/quotes'

const headers: HeadersInit = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
}

export default {
	async fetch(req: Request, _: any, ctx: ExecutionContext): Promise<Response> {
		const pathname = new URL(req.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
		const lang = pathname ? pathname[1] ?? 'en' : 'en'
		const type = pathname[0]

		switch (type) {
			case 'classic': {
				const full = await cacheControl(ctx, isValidLang(lang) ? lang : 'en')
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

async function cacheControl(ctx: ExecutionContext, query: string): Promise<Quotes.List> {
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

	return response.json<Quotes.List>()
}
