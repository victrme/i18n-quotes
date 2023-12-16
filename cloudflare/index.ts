import { classic, kaamelott, inspirobot } from '../src/'

const headers: HeadersInit = {
	'Content-Type': 'application/json',
	'Cache-Control': 'public, max-age=10',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
}

export default {
	async fetch(req: Request): Promise<Response> {
		const url = new URL(req.url)
		const pathname = url.pathname.replace('/quotes', '').split('/')
		const lang = pathname[2] ? pathname[2] : 'en'
		const type = pathname[1] ?? ''

		switch (type) {
			case '':
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
				return new Response(JSON.stringify({ error: 'Not found' }), {
					status: 404,
					headers,
				})
		}
	},
}
