type Classic = { type: 'classic'; lang: string }
type Kaamelott = { type: 'kaamelott' }
type Inspirobot = { type: 'inspirobot' }
type QuoteType = Classic | Kaamelott | Inspirobot

export type Quote = {
	author: string
	content: string
}

const langs = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']

export function getRandomSample(list: Quote[], amount = 20): Quote[] {
	let result: typeof list = []

	for (let i = 0; i < amount; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}

export function getQuoteTypeFromURL(url: string): QuoteType {
	const pathname = new URL(url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
	const lang = pathname ? pathname[1] ?? 'en' : 'en'
	const type = pathname[0]

	switch (type) {
		case 'kaamelott':
			return {
				type: 'kaamelott',
			}

		case 'inspirobot':
			return {
				type: 'inspirobot',
			}

		default:
			return {
				type: 'classic',
				lang: langs.includes(lang) ? lang : 'en',
			}
	}
}
