type Quote = {
	author: string
	content: string
}

const langlist = ['de', 'en', 'fr', 'it', 'nl', 'pl', 'ru', 'sv']

export default async (request: Request): Promise<Response> => {
	let lang = new URL(request.url).pathname.replace('/classic/', '')
	let full: Quote[] = []
	const result: Quote[] = []

	if (langlist.indexOf(lang) === -1) {
		lang = 'en'
	}

	try {
		const path = `../../quotes/${lang}.json`
		const { default: data } = await import(path, { assert: { type: 'json' } })
		full = data as unknown as Quote[]
	} catch (error) {
		console.warn("Can't get quote list: ", error)
	}

	for (let i = 0; i < 20; i++) {
		result.push(full[Math.floor(Math.random() * full.length)])
	}

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	})
}
