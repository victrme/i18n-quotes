import handler from '../../lib/classic_handler.ts'
import sv from '../../quotes/sv.ts'

export default (): Response => {
	return handler(sv)
}
