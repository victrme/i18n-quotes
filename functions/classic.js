module.exports.handler = async (event) => {
	const randInt = (max) => Math.floor(Math.random() * max)
	const path = event.path.replaceAll('/', '').replace('classic', '')
	const lang = path || 'en'
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
