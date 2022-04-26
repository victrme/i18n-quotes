module.exports.handler = async (event) => {
	return {
		statusCode: 418,
		body: 'I am a teapot',
	}
}
