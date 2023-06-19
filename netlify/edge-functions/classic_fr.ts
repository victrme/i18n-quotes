import handler from '../../lib/classic_handler.ts'
import fr from '../../quotes/fr.ts'

export default (): Response => {
	return handler(fr)
}
