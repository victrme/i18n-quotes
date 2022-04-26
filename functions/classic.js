const fetch = require('node-fetch').default

module.exports.handler = async (event) => {
	const randInt = (max) => Math.floor(Math.random() * max)
	const lang = event.path.replace('/classic/', '') || 'en'
	let list

	try {
		list = require(`../quotes/${lang}.json`)
	} catch (error) {
		return { statusCode: 418 }
	}

	return {
		statusCode: 200,
		body: JSON.stringify(list[randInt(list.length)]),
	}
}
