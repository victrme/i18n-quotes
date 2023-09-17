import { Quote } from './worker'

export default async function kaamelott(): Promise<Quote[]> {
	let list = (await import('../quotes/kaamelott.json')).default
	let result: Quote[] = []

	for (let i = 0; i < 20; i++) {
		result.push(list[Math.floor(Math.random() * list.length)])
	}

	return result
}
