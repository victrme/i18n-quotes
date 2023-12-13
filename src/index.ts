import getRandomSample from './funcs/getsample'
import quotesList from './funcs/quoteslist'
import inspirobot from './funcs/inspirobot'

import type Quotes from './types/quotes'

export default async function handler(which: Quotes.Type): Promise<Quotes.List> {
	switch (which.type) {
		case 'classic':
			return getRandomSample(quotesList[which.lang])

		case 'kaamelott':
			return getRandomSample(quotesList.kaamelott)

		case 'inspirobot':
			return await inspirobot()
	}
}
