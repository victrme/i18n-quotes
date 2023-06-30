import { Quote } from './worker'

type Inspirobot = {
	data: {
		text?: string
		type?: string
	}[]
}

export default async function inspirobot(): Promise<Quote[]> {
	let inspi: Inspirobot['data'] = []
	let result: Quote[] = []

	const filtering = (quote: string) => !quote.includes('[pause') || quote.length < 200

	try {
		const resp = await fetch('https://inspirobot.me/api?generateFlow=1')
		const json = (await resp.json()) as Inspirobot
		inspi = json.data
	} catch (error) {
		console.warn("Can't get to inspirobot: ", error)
	}

	try {
		inspi = inspi.filter((d) => d.type === 'quote' && filtering(d.text ?? ''))
		result = inspi.map((d) => ({ author: 'Inspirobot', content: d.text ?? '' }))
	} catch (error) {
		console.log(error)
	}

	return result
}
