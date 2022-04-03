const quotes = {
	en: require('./quotes/en.json'),
	fr: require('./quotes/fr.json'),
	ru: require('./quotes/ru.json'),
}

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

app.get('/:lang', (req, res) => {
	const lang = req.params.lang || 'en'
	const count = req.query.count || 1
	const all = quotes[lang]

	let list = []

	for (let i = 0; i < count; i++) {
		list.push(all[randInt(all.length)])
	}

	res.status(200).send(list)
})

app.get('/:lang/all', (req, res) => {
	res.status(200).send(quotes[req.params.lang])
})

app.get('/:lang/count', (req, res) => {
	const lang = req.params.lang
	const length = quotes[lang].length

	res.status(200).send({ lang, length })
})
