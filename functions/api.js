const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

const quotes = {
	en: require('../quotes/en.json'),
	fr: require('../quotes/fr.json'),
	ru: require('../quotes/ru.json'),
	it: require('../quotes/it.json'),
	nl: require('../quotes/nl.json'),
	sv: require('../quotes/sv.json'),
	de: require('../quotes/de.json'),
}

const getLang = (lang) => Object.keys(quotes).find((l) => lang === l) || 'en'
const randInt = (max) => Math.floor(Math.random() * max)

router.get('/', (req, res) => {
	res.status(200).send(quotes.en[randInt(quotes.en.length)])
})

router.get('/:lang', (req, res) => {
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

router.get('/:lang/all', (req, res) => {
	res.status(200).send(quotes[getLang(req.params.lang)])
})

router.get('/:lang/count', (req, res) => {
	const lang = getLang(req.params.lang)
	const length = quotes[lang].length

	res.status(200).send({ lang, length })
})

app.use(bodyParser.json())
app.use('/.netlify/functions/api', router) // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

module.exports = app
module.exports.handler = serverless(app)
