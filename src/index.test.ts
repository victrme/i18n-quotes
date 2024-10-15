import { describe, it, expect } from 'vitest'
import { Langs, Quote, classic, kaamelott, inspirobot } from '.'

describe('Classic', () => {
	it('has valid type', async () => {
		const list = await classic('en', 1)
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	it('returns english quotes with unknown lang', async () => {
		const unknown = quotesToString(await classic('gljikngiuosphg'))
		const english = quotesToString(await classic('en'))
		expect(unknown).toEqual(english)
	})

	it('returns empty array when amount is zero', async () => {
		const list = await classic('en', 0)
		expect(list.length).toBe(0)
	})

	it('returns randomly when specifying quotes amount', async () => {
		const first = quotesToString(await classic('', 10))
		const second = quotesToString(await classic('', 10))
		expect(first).not.toEqual(second)
	})

	it('all langs are working', async () => {
		const langs: Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
		let strings: string[] = []
		let string = ''

		for (const lang of langs) {
			string = quotesToString(await classic(lang))

			if (strings.includes(string)) {
				continue
			}

			strings.push(string)
		}

		expect(strings.length).toEqual(langs.length)
	})
})

describe('Kaamelott', function () {
	it('has valid type', async function () {
		const list = await kaamelott(1)
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	it('returns empty array when amount is zero', async () => {
		const list = await kaamelott(0)
		expect(list.length).toBe(0)
	})

	it('returns randomly when specifying quotes amount', async () => {
		const first = quotesToString(await kaamelott(10))
		const second = quotesToString(await kaamelott(10))
		expect(first).not.toEqual(second)
	})
})

describe('Inspirobot', function () {
	let list: Quote[] = []

	it('has valid type', async function () {
		list = await inspirobot()
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	it('gets at least 10 quotes', async function () {
		expect(list.length).toBeGreaterThanOrEqual(10)
	})
})

//
//
//

function isOfTypeQuotesList(list: any): boolean {
	return (
		Array.isArray(list) &&
		typeof list[0] === 'object' &&
		typeof list[0]['author'] === 'string' &&
		typeof list[0]['content'] === 'string'
	)
}

function quotesToString(list: Quote[]) {
	return list
		.map((a) => a.content + a.author)
		.flat()
		.join(',')
}
