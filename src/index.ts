export type Langs = 'en' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ru' | 'sv'
export type Quote = { author: string; content: string }

const QUOTES_VERSION = '15102024'
const LANGS: Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']

export async function classic(lang: string, amount?: number): Promise<Quote[]> {
	const base = 'https://cdn.jsdelivr.net/gh/victrme/i18n-quotes@main/quotes/'
	const filename = validLang(lang) + '.json?v='
	const filepath = base + filename + QUOTES_VERSION
	const resp = await fetch(filepath)
	const json = await resp.json()

	if (amount && amount > 0) return getRandomSample(json, amount)
	if (amount === 0) return []

	return json
}

export async function kaamelott(amount?: number): Promise<Quote[]> {
	const base = 'https://cdn.jsdelivr.net/gh/victrme/i18n-quotes@main/quotes/'
	const filepath = base + 'kaamelott.json?v=' + QUOTES_VERSION
	const resp = await fetch(filepath)
	const json = await resp.json()

	if (amount && amount > 0) return getRandomSample(json, amount)
	if (amount === 0) return []

	return json
}

export async function inspirobot(amount?: number): Promise<Quote[]> {
	const base = 'https://raw.githubusercontent.com/victrme/i18n-quotes/refs/heads/main/quotes/'
	const filepath = base + 'inspirobot.txt?v=' + QUOTES_VERSION
	const resp = await fetch(filepath)
	const text = await resp.text()

	const arr = text.split('\n')
	const json: Quote[] = arr.map((line) => ({ author: 'Inspirobot', content: line }))

	if (amount && amount > 0) return getRandomSample(json, amount)
	if (amount === 0) return []

	return json
}

function getRandomSample(list: Quote[], amount: number): Quote[] {
	let result: Quote[] = []
	let random = 0

	for (let i = 0; i < amount; i++) {
		random = Math.floor(Math.random() * list.length)
		result.push(list[random])
	}

	return result
}

function validLang(lang: string): Langs {
	const isLang = (l: string): l is Langs => LANGS.includes(l as any)
	return isLang(lang) ? lang : 'en'
}
