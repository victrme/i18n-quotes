import handler from '../../lib/classic_handler.ts'
import de from '../../quotes/de.ts'

export default (): Response => {
	return handler(de)
}
