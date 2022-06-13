module.exports.handler = async () => {
	let raw = require(`../quotes/kaamelott-small.json`)

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
