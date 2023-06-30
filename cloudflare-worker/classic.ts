import { Quote } from './worker'

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

export default async function classic(lang: string): Promise<Quote[]> {
	const list: Quote[] = (await quotes[lang]()).default
	const result: Quote[] = []

	for (let i = 0; i < 20; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}
