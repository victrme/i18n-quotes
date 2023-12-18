export declare namespace Quotes {
	interface Item {
		author: string
		content: string
	}

	type List = Item[]

	type Langs = 'en' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ru' | 'sv'

	type Classic = { type: 'classic'; lang: Langs }
	type Kaamelott = { type: 'kaamelott' }
	type Inspirobot = { type: 'inspirobot' }

	type Type = Classic | Kaamelott | Inspirobot
}

interface Inspirobot {
	data: {
		text?: string
		type?: string
	}[]
}

const QUOTES_VERSION: string = '13122023'
const CDN_BASE_URL: string = 'https://cdn.jsdelivr.net/gh/victrme/i18n-quotes@main/quotes/'

//
//
//

export async function classic(lang: string, amount?: number): Promise<Quotes.List> {
	return await jsonFileQuotes(validLang(lang), amount)
}

export async function kaamelott(amount?: number): Promise<Quotes.List> {
	return await jsonFileQuotes('kaamelott', amount)
}

export async function inspirobot(): Promise<Quotes.List> {
	const responses: Response[] = []
	let result: Quotes.List = []

	// Split the requests at max 5 to avoid reaching simultaneous open connections limit
	// https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections

	responses.push(...(await fetchInspirobotResponses(4)))
	responses.push(...(await fetchInspirobotResponses(4)))

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

//
//	Helpers
//

async function jsonFileQuotes(filename: Quotes.Langs | 'kaamelott', amount?: number): Promise<Quotes.List> {
	const path = `${CDN_BASE_URL}${filename}.json?v=${QUOTES_VERSION}`
	const resp = await fetch(path)
	const json = await resp.json()

	return amount === undefined ? json : getRandomSample(json, amount)
}

function fetchInspirobotResponses(amount: number): Promise<Response[]> {
	const url = 'https://inspirobot.me/api?generateFlow=1'
	const promises: Promise<Response>[] = []

	return new Promise<Response[]>((resolve) => {
		for (let i = 0; i <= amount; i++) promises.push(fetch(url))
		Promise.all(promises).then((r) => resolve(r))
	})
}

function getRandomSample(list: Quotes.List, amount: number): Quotes.List {
	let result: typeof list = []

	for (let i = 0; i < amount; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}

function validLang(lang: string): Quotes.Langs {
	const langs: Quotes.Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
	const isLang = (l: string): l is Quotes.Langs => langs.includes(l as any)
	return isLang(lang) ? lang : 'en'
}

function quotefilter(quote: string): boolean {
	return !quote.includes('[pause') || quote.length < 150
}
