import handler from '../../lib/classic_handler.ts'
import pl from '../../quotes/pl.ts'

export default (): Response => {
	return handler(pl)
}
