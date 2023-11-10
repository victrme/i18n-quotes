import type { Quote } from './funcs'

type InspirobotData = {
	data: {
		text?: string
		type?: string
	}[]
}

export default async function inspirobot(): Promise<Quote[]> {
	const promises: Promise<Response>[] = []
	let result: Quote[] = []

	for (let i = 0; i < 10; i++) {
		promises.push(fetch('https://inspirobot.me/api?generateFlow=1'))
	}

	const responses = await Promise.all(promises)

	if (responses.every((r) => r.status === 200)) {
		for (const resp of responses) {
			const json = (await resp.json()) as InspirobotData
			let inspi: InspirobotData['data'] = json.data

			inspi = inspi.filter((d) => d.type === 'quote' && quotefilter(d.text ?? ''))
			result.push(...inspi.map((d) => ({ author: 'Inspirobot', content: d.text ?? '' })))
		}
	}

	return result
}

function quotefilter(quote: string): boolean {
	return !quote.includes('[pause') || quote.length < 150
}
