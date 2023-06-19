const langlist = ['de', 'en', 'fr', 'it', 'nl', 'pl', 'ru', 'sv']

type Quote = {
	author: string
	content: string
}

export default function handler(full: Quote[]): Response {
	const result: Quote[] = []

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
