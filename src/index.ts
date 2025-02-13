export type Quote = { author: string; content: string }
export type QuoteType = 'classic' | 'kaamelott' | 'inspirobot' | 'stoic' | 'hitokoto' | 'office'
export type Langs = 'en' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ru' | 'sv'

const QUOTES_VERSION = '02022025'

const RESPONSE_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
	'Cache-Control': 'public, max-age=10',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
}

export default {
	fetch: worker,
}

async function worker(req: Request): Promise<Response> {
	const url = new URL(req.url)
	const amount = parseInt(url.searchParams.get('amount') ?? '20')
	const pathname = url.pathname.replace('/quotes', '').split('/')
	const lang = pathname[2] ? pathname[2] : 'en'
	const type = pathname[1] ?? ''
	let filename = ''

	if (type === '') filename = validLang(lang)
	if (type === 'classic') filename = validLang(lang)
	if (type === 'kaamelott') filename = 'kaamelott'
	if (type === 'inspirobot') filename = 'inspirobot'
	if (type === 'hitokoto') filename = 'hitokoto'
	if (type === 'stoic') filename = 'stoic'
	if (type === 'office') filename = 'office'

	try {
		return new Response(JSON.stringify(await getQuotes(filename, amount)), {
			headers: RESPONSE_HEADERS,
		})
	} catch (err) {
		return new Response(err as string, { status: 500 })
	}
}

export async function getQuotes(filename: string, amount = 20): Promise<Quote[]> {
	if (filename === '') return await Promise.reject({ statusText: 'Not Found', status: 404 })
	const base = 'https://cdn.jsdelivr.net/gh/victrme/i18n-quotes@refs/heads/main/quotes/'
	const filepath = `${base}${filename}.json?v=${QUOTES_VERSION}`

	const controller = new AbortController()
	return fetch(filepath, { signal: controller.signal })
		.then(async (resp) => {
			if (resp.ok) return resp.json()
			else return await Promise.reject(resp)
		})
		.then((content) => {
			return getRandomSample(content, amount)
		})
		.finally(() => {
			controller.abort()
		})
}

function getRandomSample(list: Quote[], amount: number): Quote[] {
	const result: Quote[] = []
	let random = 0

	for (let i = 0; i < amount; i++) {
		random = Math.floor(Math.random() * list.length)
		result.push(list[random])
	}

	return result
}

function validLang(lang: string): Langs {
	const LANGS: Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
	const isLang = (l: string): l is Langs => LANGS.includes(l as any)
	return isLang(lang) ? lang : 'en'
}
