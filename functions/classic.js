module.exports.handler = async (event) => {
	const path = event.path || ''
	const lang = path.replace('/classic', '').replace('/', '') || 'en'
	let raw

	try {
		raw = require(`../quotes/${lang}.json`)
	} catch (error) {
		raw = require(`../quotes/en.json`)
	}

	const array = Array(20)
		.fill()
		.map(() => raw[Math.floor(Math.random() * raw.length)])

	return {
		statusCode: 200,
		body: JSON.stringify(array),
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	}
}
