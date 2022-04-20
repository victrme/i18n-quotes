const quotes = {
	en: require('./quotes/en.json'),
	fr: require('./quotes/fr.json'),
	ru: require('./quotes/ru.json'),
	it: require('./quotes/it.json'),
	it: require('./quotes/nl.json'),
	it: require('./quotes/sv.json'),
}

const getLang = (lang) => Object.keys(quotes).find((l) => lang === l) || 'en'
const randInt = (max) => Math.floor(Math.random() * max)
const express = require('express')
const cors = require('cors')
const app = express()

app.use(
	cors({
		credientials: true,
		origin: true,
	})
)

app.listen(process.env.PORT || 8080, () => console.log('server running on port 8080'))

app.get('/', (req, res) => {
	res.status(200).send(quotes.en[randInt(quotes.en.length)])
})

app.get('/:lang', (req, res) => {
	const lang = getLang(req.params.lang)
	const all = quotes[lang]

	if (req.query.amount) {
		const amount = req.query.amount
		let list = []

		for (let i = 0; i < amount; i++) {
			list.push(all[randInt(all.length)])
		}

		res.status(200).send(list)
		return
	}

	res.status(200).send(all[randInt(all.length)])
})

app.get('/:lang/all', (req, res) => {
	res.status(200).send(quotes[getLang(req.params.lang)])
})

app.get('/:lang/count', (req, res) => {
	const lang = getLang(req.params.lang)
	const length = quotes[lang].length

	res.status(200).send({ lang, length })
})
