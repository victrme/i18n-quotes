// keep .default, if not everything somehow breaks
const fetch = require('node-fetch').default

exports.handler = async () => {
	const inspirobot = await fetch('https://inspirobot.me/api?generateFlow=1')
	const json = await inspirobot.json()

	return {
		statusCode: 200,
		body: JSON.stringify(json),
	}
}
