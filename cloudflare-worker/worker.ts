type Quote = {
	author: string
	content: string
}

type Inspirobot = {
	data: {
		text?: string
		type?: string
	}[]
}

export default {
	async fetch(request: Request): Promise<Response> {
		const pathname = new URL(request.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
		const lang = pathname[1] ?? 'en'
		const type = pathname[0]
		let result: Quote[]

		switch (type) {
			case 'kaamelott':
				result = await kaamelott()
				break

			case 'inspirobot':
				result = await inspirobot()
				break

			case 'classic':
				result = await classic(lang)
				break

			default:
				result = await classic('en')
		}

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
	},
}

async function classic(lang: string): Promise<Quote[]> {
	const quotes = {
		en: async (): Promise<Quote[]> => import('../quotes/en.json'),
		fr: async (): Promise<Quote[]> => import('../quotes/fr.json'),
		de: async (): Promise<Quote[]> => import('../quotes/de.json'),
		it: async (): Promise<Quote[]> => import('../quotes/it.json'),
		nl: async (): Promise<Quote[]> => import('../quotes/nl.json'),
		pl: async (): Promise<Quote[]> => import('../quotes/pl.json'),
		ru: async (): Promise<Quote[]> => import('../quotes/ru.json'),
		sv: async (): Promise<Quote[]> => import('../quotes/sv.json'),
	}

	const list: Quote[] = (await quotes[lang]()).default
	const result: Quote[] = []

	for (let i = 0; i < 20; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}

async function inspirobot(): Promise<Quote[]> {
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

async function kaamelott(): Promise<Quote[]> {
	let list = (await import('../quotes/kaamelott.json')).default
	let result: Quote[] = []

	for (let i = 0; i < 20; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}
