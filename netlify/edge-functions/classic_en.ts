import handler from '../../lib/classic_handler.ts'
import en from '../../quotes/en.ts'

export default (): Response => {
	return handler(en)
}
