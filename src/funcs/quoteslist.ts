import type Quotes from '../types/quotes'

type DynamicQuotesImport = {
	[key in Quotes.Langs | 'kaamelott']: Quotes.List
}

const quotes: DynamicQuotesImport = {
	en: (await import('../../quotes/en.json')).default,
	fr: (await import('../../quotes/fr.json')).default,
	de: (await import('../../quotes/de.json')).default,
	it: (await import('../../quotes/it.json')).default,
	nl: (await import('../../quotes/nl.json')).default,
	pl: (await import('../../quotes/pl.json')).default,
	ru: (await import('../../quotes/ru.json')).default,
	sv: (await import('../../quotes/sv.json')).default,
	kaamelott: (await import('../../quotes/kaamelott.json')).default,
}

export default quotes
