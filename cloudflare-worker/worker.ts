import classic from './classic'
import kaamelott from './kaamelott'
import inspirobot from './inspirobot'

export type Quote = {
	author: string
	content: string
}

export default {
	async fetch(request: Request): Promise<Response> {
		const pathname = new URL(request.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
		const lang = pathname[1] ?? 'en'
		const type = pathname[0]
		let result: Quote[]

		switch (type) {
			case 'kaamelott':
				result = await kaamelott()
				break

			case 'inspirobot':
				result = await inspirobot()
				break

			case 'classic':
				result = await classic(lang)
				break

			default:
				result = await classic('en')
		}

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
	},
}
