// keep .default, if not everything somehow breaks
const fetch = require('node-fetch')

exports.handler = async () => {
	const kaamelott = await fetch('https://quotes-proxy.herokuapp.com/kaamelott')
	const json = await kaamelott.json()

	return {
		statusCode: 200,
		body: JSON.stringify(json),
	}
}
