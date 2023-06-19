import handler from '../../lib/classic_handler.ts'
import ru from '../../quotes/ru.ts'

export default (): Response => {
	return handler(ru)
}
