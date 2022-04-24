module.exports.handler = async (event) => {
	const randInt = (max) => Math.floor(Math.random() * max)
	const lang = event.queryStringParameters.lang || 'en'
	const list = require(`../quotes/${lang}.json`)

	return {
		statusCode: 200,
		body: JSON.stringify(list[randInt(list.length)]),
	}
}
