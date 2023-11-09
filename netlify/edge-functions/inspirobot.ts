import { getQuoteTypeFromURL } from '../../src/funcs.ts'
import inspirobot from '../../src/inspirobot.ts'

const init: ResponseInit = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
}

export default async function handler(request: Request): Promise<Response> {
	const which = getQuoteTypeFromURL(request.url)

	if (which.type === 'inspirobot') {
		const resp = await inspirobot()
		return new Response(JSON.stringify(resp), init)
	}

	return new Response('Not found', { ...init, status: 404 })
}
