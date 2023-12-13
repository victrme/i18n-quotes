import type Quotes from '../types/quotes'

export default function getRandomSample(list: Quotes.List, amount = 20): Quotes.List {
	let result: typeof list = []

	for (let i = 0; i < amount; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}
