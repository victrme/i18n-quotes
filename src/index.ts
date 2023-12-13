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
const CDN_BASE_URL: string = 'https://cdn.jsdelivr.net/gh/victrme/i18n-quotes@main/'

//
//
//

export async function classic(lang: string, amount = 20): Promise<Quotes.List> {
	let result: Quotes.List = []

	try {
		console.log(lang)
		lang = isValidLang(lang) ? lang : 'en'

		const url = `${CDN_BASE_URL}/quotes/${lang}.json?v=${QUOTES_VERSION}`
		const resp = await fetch(url)
		const json = await resp.json()

		result = getRandomSample(json, amount)
	} catch (error) {
		console.log(error)
	}

	return result
}

export async function kaamelott(amount = 20): Promise<Quotes.List> {
	let result: Quotes.List = []

	try {
		const url = `${CDN_BASE_URL}/quotes/kaamelott.json?v=${QUOTES_VERSION}`
		const resp = await fetch(url)
		const json = await resp.json()

		result = getRandomSample(json, amount)
	} catch (error) {
		console.log(error)
	}

	return result
}

export async function inspirobot(): Promise<Quotes.List> {
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

//
//	Helpers
//

function getRandomSample(list: [], amount = 20): Quotes.List {
	let result: typeof list = []

	for (let i = 0; i < amount; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}

function isValidLang(lang: string): lang is Quotes.Langs {
	const langs: Quotes.Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
	return langs.includes(lang as any)
}

function quotefilter(quote: string): boolean {
	return !quote.includes('[pause') || quote.length < 150
}
