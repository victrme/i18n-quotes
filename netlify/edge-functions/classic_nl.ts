import handler from '../../lib/classic_handler.ts'
import nl from '../../quotes/nl.ts'

export default (): Response => {
	return handler(nl)
}
