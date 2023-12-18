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
	const promises = []
	let list: Quotes.List = []

	for (let i = 0; i < 6; i++) {
		promises.push(fetch('https://inspirobot.me/api?generateFlow=1'))
	}

	for (const response of await Promise.all(promises)) {
		if (response.status === 200) {
			const json = await response.json()
			list = list.concat(sanitizeInspirobotData(json.data))
		}
	}

	return list
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

function sanitizeInspirobotData(data: Inspirobot['data']): Quotes.List {
	const result = []

	for (const { type, text } of data) {
		const isQuote = type === 'quote'
		const isValid = text && !text.includes('[') && text.length < 100

		if (isQuote && isValid) {
			result.push({ author: 'Inspirobot', content: text })
		}
	}

	return result
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
