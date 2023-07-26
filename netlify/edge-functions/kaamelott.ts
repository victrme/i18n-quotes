type Quote = {
	author: string
	content: string
}

export default async (): Promise<Response> => {
	const array: Quote[] = []
	let full: Quote[] = []

	try {
		const url = 'https://raw.githubusercontent.com/victrme/i18n-quotes/edge-function/quotes/kaamelott.json'
		full = await (await fetch(url)).json()
	} catch (_) {
		console.warn('Cannot get kaamelott list')
	}

	for (let i = 0; i < 20; i++) {
		const random_quote = full[Math.floor(Math.random() * full.length)]
		if (random_quote) {
			array.push(random_quote)
		}
	}

	return new Response(JSON.stringify(array), {
		status: 200,
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	})
}
