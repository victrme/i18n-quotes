import handler from '../../lib/classic_handler.ts'
import it from '../../quotes/it.ts'

export default (): Response => {
	return handler(it)
}
