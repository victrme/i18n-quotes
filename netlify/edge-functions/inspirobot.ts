import inspirobot from '../../src/funcs/inspirobot.ts'

const init: ResponseInit = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
}

export default async function handler(request: Request): Promise<Response> {
	const pathname = new URL(request.url).pathname?.replace('/', '').replace('quotes/', '').split('/') ?? []
	const type = pathname[0]

	if (type === 'inspirobot') {
		const resp = await inspirobot()
		return new Response(JSON.stringify(resp), init)
	}

	return new Response('Not found', { ...init, status: 404 })
}
