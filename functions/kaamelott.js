const fetch = require('node-fetch').default

exports.handler = async () => {
	const kaamelott = await fetch('https://quotes-proxy.herokuapp.com/kaamelott')
	const json = await kaamelott.json()

	return {
		statusCode: 200,
		body: JSON.stringify(json),
	}
}
