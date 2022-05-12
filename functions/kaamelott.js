const axios = require('axios').default

exports.handler = async () => {
	const api = await axios('https://kaamelott.chaudie.re/api/random')
	let result = {}

	try {
		const { citation, infos } = api.data.citation
		result = { author: infos.personnage, content: citation }
	} catch (error) {
		console.log(error)
	}

	return {
		statusCode: 200,
		body: JSON.stringify(result),
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	}
}
