const axios = require('axios').default

exports.handler = async () => {
	const resp = await axios('https://inspirobot.me/api?generateFlow=1')
	let array = []

	try {
		const filtering = (quote) => !quote.includes('[pause') || quote.length < 200

		array = [...resp.data.data]
		array = array.filter((d) => d.type === 'quote' && filtering(d.text)) // data is a quote & passes the filter
		array = array.map((a) => ({ author: 'Inspirobot', content: a.text }))
	} catch (error) {
		console.log(error)
	}

	return {
		statusCode: 200,
		body: JSON.stringify(array),
		headers: {
			'content-type': 'application/json',
			'access-control-allow-origin': '*',
		},
	}
}
