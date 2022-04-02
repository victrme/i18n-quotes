// is mega bad, tkt
const quotes = {
	en: require('./quotes/en.json'),
	fr: require('./quotes/fr.json'),
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max)
}

const express = require('express')
const app = express()

app.use(express.json())

app.listen(8080, () => console.log('is on !'))

app.get('/random', (req, res) => {
	const lang = req.query.lang || 'en'
	const count = req.query.count || 1
	const all = quotes[lang]

	let list = []

	for (let i = 0; i < count; i++) {
		list.push(all[getRandomInt(all.length)])
	}

	res.status(200).send(list)
})

app.get('/all', (req, res) => {
	const lang = req.query.lang || 'en'
	res.status(200).send(quotes[lang])
})
