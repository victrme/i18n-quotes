import { classic, kaamelott, inspirobot } from '../src/'

const headers: HeadersInit = {
	'Content-Type': 'application/json',
	'Cache-Control': 'public, max-age=10',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
}

export default {
	async fetch(req: Request): Promise<Response> {
		const pathname = new URL(req.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
		const lang = pathname ? pathname[1] ?? 'en' : 'en'
		const type = pathname[0]

		switch (type) {
			case 'classic': {
				return new Response(JSON.stringify(await classic(lang, 20)), { headers })
			}

			case 'kaamelott': {
				return new Response(JSON.stringify(await kaamelott(20)), { headers })
			}

			case 'inspirobot': {
				return new Response(JSON.stringify(await inspirobot()), { headers })
			}

			default:
				return new Response('Not found', {
					status: 404,
					headers,
				})
		}
	},
}
