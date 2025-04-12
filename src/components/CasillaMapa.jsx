import React from 'react'
import '../styles/CasillaMapa.css'


import Globo from './Globo'
import MonoMapa from './MonoMapa'
import globoExplotado from '../assets/images/globos/globoExplotado.png'

/**
 * 
 * @param {*} estado: Estado de la casilla, puede ser 'default', 'agua', 'camino', 'selected'. El selected es un estado del 'default'
 * @returns 
 */
export const CasillaMapa = ({ estado = 'default', index, actualizarMapa, globos, monos, explotaGloboCasilla  }) => {

    const manejarClick = () => {
        actualizarMapa(index)
    }

    return (
        <div onClick={manejarClick} className={`casilla-mapa casilla-${estado}`}>

        {globos.map(globo => (
            <Globo 
            key={globo.id}
            health={globo.health}
            />
        ))}
        {monos.map(mono => (
            <MonoMapa 
            key={mono.id}
            tipo={mono.tipo}
            />
        ))}
        {explotaGloboCasilla && <img className='globo-explotado' src={globoExplotado} />}
        </div>

    )
}