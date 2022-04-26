const axios = require('axios').default

exports.handler = async () => {
	const inspirobot = await axios('https://inspirobot.me/api?generateFlow=1')
	const json = await inspirobot.json()

	return {
		statusCode: 200,
		body: JSON.stringify(json),
	}
}
