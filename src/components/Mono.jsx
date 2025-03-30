
import { MONOS } from "../utils/constantes"

export const Mono = ({ tipo, agarrarMono, sePuedeComprar }) => {

    const agarrar = () => {
        if (sePuedeComprar) agarrarMono(tipo)
    }

    return (
        <div id={`'monkey-${tipo}'`} className={`monkey${!sePuedeComprar ? ' disabled' : ''}`}>
            <img 
                src={  MONOS[tipo].imagen } 
                alt={`Monkey ${tipo}`} 
                className={'monkey-img' }
                onClick={agarrar}
            />
            <span className="monkey-count">{ MONOS[tipo].precio }</span>
        </div>
    )
}
