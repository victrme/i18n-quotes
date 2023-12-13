import { getQuoteTypeFromURL, getRandomSample } from '../../src/funcs.ts'

const init: ResponseInit = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
}

export default async function handler(request: Request): Promise<Response> {
	const which = getQuoteTypeFromURL(request.url)

	if (which.type === 'kaamelott') {
		const base = 'https://raw.githubusercontent.com/victrme/i18n-quotes/main/quotes/'
		const resp = await fetch(base + 'kaamelott.json?v=0.0.0')
		const full = await resp.json()

		return new Response(JSON.stringify(getRandomSample(full)), init)
	}

	return new Response('Not found', { ...init, status: 404 })
}
