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
	const promises: Promise<Response>[] = []
	let result: Quotes.List = []
	let sessionID = ''

	try {
		const resp = await fetch('https://inspirobot.me/api?getSessionID=1')
		const text = await resp.text()
		sessionID += `&sessionID=${text}`
	} catch (err) {
		console.warn(err)
	}

	for (let i = 0; i < 8; i++) {
		promises.push(fetch(`https://inspirobot.me/api?generateFlow=1${sessionID}`))
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

async function jsonFileQuotes(filename: Quotes.Langs | 'kaamelott', amount?: number): Promise<Quotes.List> {
	const path = `${CDN_BASE_URL}${filename}.json?v=${QUOTES_VERSION}`
	const resp = await fetch(path)
	const json = await resp.json()

	return amount === undefined ? json : getRandomSample(json, amount)
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
