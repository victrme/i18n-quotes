const axios = require('axios').default

exports.handler = async () => {
	const resp = await axios('https://kaamelott.chaudie.re/api/random')

	return {
		statusCode: 200,
		body: JSON.stringify(resp.data),
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	}
}
