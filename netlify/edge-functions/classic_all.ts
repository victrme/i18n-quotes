import handler from '../../lib/classic_handler.ts'
import it from '../../quotes/it.ts'
import nl from '../../quotes/nl.ts'
import pl from '../../quotes/pl.ts'
import ru from '../../quotes/ru.ts'
import sv from '../../quotes/sv.ts'
import en from '../../quotes/en.ts'
import de from '../../quotes/de.ts'
import fr from '../../quotes/fr.ts'

export default (): Response => {
	console.log('all')
	return handler(fr)
}
