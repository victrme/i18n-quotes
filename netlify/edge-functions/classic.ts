import getRandomSample from '../../src/funcs/getsample'
import isValidLang from '../../src/funcs/validlang'

const init: ResponseInit = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
}

export default async function handler(request: Request): Promise<Response> {
	const pathname = new URL(request.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
	const lang = pathname ? pathname[1] ?? 'en' : 'en'
	const type = pathname[0]

	if (type === 'classic') {
		const base = 'https://raw.githubusercontent.com/victrme/i18n-quotes/main/quotes/'
		const resp = await fetch(base + (isValidLang(lang) ? lang : 'en') + '.json?v=0.0.0')
		const full = await resp.json()

		return new Response(JSON.stringify(getRandomSample(full)), init)
	}

	return new Response('Not found', { ...init, status: 404 })
}
