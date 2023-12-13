declare namespace Quotes {
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

export default Quotes
