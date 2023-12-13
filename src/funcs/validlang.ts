import type Quotes from '../types/quotes'

export default function isValidLang(lang: string): lang is Quotes.Langs {
	const langs: Quotes.Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
	return lang in langs
}
