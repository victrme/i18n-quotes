import type Quotes from '../types/quotes'

interface Inspirobot {
	data: {
		text?: string
		type?: string
	}[]
}

export default async function inspirobot(): Promise<Quotes.List> {
	const promises: Promise<Response>[] = []
	let result: Quotes.List = []

	for (let i = 0; i < 10; i++) {
		promises.push(fetch('https://inspirobot.me/api?generateFlow=1'))
	}

	const responses = await Promise.all(promises)

	if (responses.every((r) => r.status === 200)) {
		for (const resp of responses) {
			const json = (await resp.json()) as Inspirobot
			let inspi: Inspirobot['data'] = json.data

			inspi = inspi.filter((d) => d.type === 'quote' && quotefilter(d.text ?? ''))
			result.push(...inspi.map((d) => ({ author: 'Inspirobot', content: d.text ?? '' })))
		}
	}

	return result
}

function quotefilter(quote: string): boolean {
	return !quote.includes('[pause') || quote.length < 150
}
