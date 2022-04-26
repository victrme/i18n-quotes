module.exports.handler = async (event) => {
	const path = event.path || ''
	const lang = path.replace('/classic', '').replace('/', '') || 'en'
	let list

	try {
		list = require(`../quotes/${lang}.json`)
	} catch (error) {
		return { statusCode: 418 }
	}

	return {
		statusCode: 200,
		body: JSON.stringify(list[Math.floor(Math.random() * list.length)]),
	}
}
