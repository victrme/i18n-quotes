const axios = require('axios').default

exports.handler = async () => {
	const resp = await axios('https://inspirobot.me/api?generateFlow=1')

	return {
		statusCode: 200,
		body: JSON.stringify(resp.data),
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	}
}
