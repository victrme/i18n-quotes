type Quote = {
	author: string
	content: string
}

export default async function handler(request: Request): Promise<Response> {
	const langlist = ['de', 'en', 'fr', 'it', 'nl', 'pl', 'ru', 'sv']
	const pathname = new URL(request.url).pathname.replace('classic', '').replaceAll('/', '')
	const lang = langlist.includes(pathname) ? pathname : 'en'

	const full = await (await fetch(`https://raw.githubusercontent.com/victrme/i18n-quotes/main/quotes/${lang}.json`)).json()
	const result: Quote[] = []

	for (let i = 0; i < 20; i++) {
		result.push(full[Math.floor(Math.random() * full.length)])
	}

	console.log(request.headers.get('referer'))

	return Response.json(result, {
		status: 200,
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	})
}
