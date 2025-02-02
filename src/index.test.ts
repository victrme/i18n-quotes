import { getQuotes, Langs, Quote } from './index.ts'
import { expect } from 'jsr:@std/expect'

Deno.test('Classic', async (test) => {
	await test.step('has valid type', async () => {
		const list = await getQuotes('en')
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	await test.step('returns empty array when amount is zero', async () => {
		const list = await getQuotes('en', 0)
		expect(list.length).toBe(0)
	})

	await test.step('returns randomly when specifying quotes amount', async () => {
		const first = quotesToString(await getQuotes('en', 10))
		const second = quotesToString(await getQuotes('en', 10))
		expect(first).not.toEqual(second)
	})

	await test.step('all langs are working', async () => {
		const langs: Langs[] = ['en', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'sv']
		let strings: string[] = []
		let string = ''

		for (const lang of langs) {
			string = quotesToString(await getQuotes(lang))

			if (strings.includes(string)) {
				continue
			}

			strings.push(string)
		}

		expect(strings.length).toEqual(langs.length)
	})
})

Deno.test('Kaamelott', async (test) => {
	await test.step('has valid type', async function () {
		const list = await getQuotes('kaamelott', 1)
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	await test.step('returns empty array when amount is zero', async () => {
		const list = await getQuotes('kaamelott', 0)
		expect(list.length).toBe(0)
	})

	await test.step('returns randomly when specifying quotes amount', async () => {
		const first = quotesToString(await getQuotes('kaamelott', 10))
		const second = quotesToString(await getQuotes('kaamelott', 10))
		expect(first).not.toEqual(second)
	})
})

Deno.test('Inspirobot', async (test) => {
	let list: Quote[] = []

	await test.step('has valid type', async function () {
		list = await getQuotes('inspirobot')
		expect(isOfTypeQuotesList(list)).toBe(true)
	})

	await test.step('gets at least 10 quotes', function () {
		expect(list.length).toBeGreaterThanOrEqual(10)
	})
})

Deno.test('The Office', async (test) => {
	await test.step('has valid type', async function () {
		const list = await getQuotes('the-office', 1)
		expect(isOfTypeQuotesList(list)).toBe(true)
	})
})

//
//
//

function isOfTypeQuotesList(list: unknown): boolean {
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
