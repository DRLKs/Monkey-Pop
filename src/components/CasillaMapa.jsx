/**
 * Componente que representa una casilla del mapa en el juego.
 * 
 * Este componente realiza la función @see actualizarMapa al hacer click o touch (Movil) en la casilla.
 * Esta función es muy compleja, se puede ver en el componente @see Juego.jsx
 */


import '../styles/CasillaMapa.css'


import Globo from './Globo'
import MonoMapa from './MonoMapa'
import globoExplotado from '../assets/images/globos/globoExplotado.webp'

/**
 * 
 * @param {*} estado: Estado de la casilla, puede ser 'default', 'agua', 'camino', 'agua_cesped1', 'agua_cesped2', 'tierra_cesped1', 'tierra_cesped2', 'selected'. El selected es un estado del 'default'
 * @returns 
 */
export const CasillaMapa = ({ estado = 'default', index, actualizarMapa, globos, monos, explotaGloboCasilla, monoVerAjustes  }) => {

    const manejarInteraccion = () => {
        actualizarMapa(index)
    }

    return (
        <div 
            onClick={manejarInteraccion} 
            onTouchStart={manejarInteraccion}
            className={`casilla-mapa casilla-${estado}`}
        >

        {globos.map(globo => (
            <Globo 
            key={globo.id}
            health={globo.health}
            />
        ))}
        {monos.map(mono => (
            <MonoMapa 
            key={mono.id}
            mono={mono}
            seleccionado={monoVerAjustes && monoVerAjustes.id === mono.id}
            />
        ))}
        {explotaGloboCasilla && <img className='globo-explotado' src={globoExplotado} alt='Explosion de globo' />}
        </div>

    )
}