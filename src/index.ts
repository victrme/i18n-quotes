import { getRandomSample, Quote, QuoteType } from './funcs'
import inspirobot from './inspirobot'

import kaamelott from '../quotes/kaamelott.json'

const classic = {
	en: (await import('../quotes/en.json')).default,
	fr: (await import('../quotes/fr.json')).default,
	de: (await import('../quotes/de.json')).default,
	it: (await import('../quotes/it.json')).default,
	nl: (await import('../quotes/nl.json')).default,
	pl: (await import('../quotes/pl.json')).default,
	ru: (await import('../quotes/ru.json')).default,
	sv: (await import('../quotes/sv.json')).default,
}

export default async function handler(which: QuoteType): Promise<Quote[]> {
	if (which.type === 'kaamelott') {
		return getRandomSample(kaamelott)
	}

	if (which.type === 'inspirobot') {
		return await inspirobot()
	}

	return getRandomSample(classic[which.lang])
}
