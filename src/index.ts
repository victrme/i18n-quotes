export type Quote = { author: string; content: string }
export type QuoteType = 'classic' | 'kaamelott' | 'inspirobot' | 'stoic' | 'hitokoto' | 'the-office'
export type Langs = 'en' | 'fr' | 'de' | 'it' | 'nl' | 'pl' | 'ru' | 'sv'

const QUOTES_VERSION = '02022025'

const RESPONSE_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
	'Cache-Control': 'public, max-age=10',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
}

export default { fetch: worker }

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
	if (type === 'the-office') filename = 'the-office'

	if (filename === '') {
		return new Response(JSON.stringify({ error: 'Not found' }), {
			status: 404,
			headers: RESPONSE_HEADERS,
		})
	} else {
		return new Response(JSON.stringify(await getQuotes(filename, amount)), {
			headers: RESPONSE_HEADERS,
		})
	}
}

export async function getQuotes(filename: string, amount = 20): Promise<Quote[]> {
	const base = 'https://cdn.jsdelivr.net/gh/Stelage/i18n-quotes@tree/main/quotes'
	const filepath = `${base}${filename}.json?v=${QUOTES_VERSION}`
	const resp = await fetch(filepath)

	const json: Quote[] = resp.status === 200 ? await resp.json() : [] 

	return amount && amount > 0 && json.length > 0 ? getRandomSample(json, amount) : []
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
