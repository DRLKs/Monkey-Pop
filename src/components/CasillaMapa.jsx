import React from 'react'
import '../styles/CasillaMapa.css'


import Globo from './Globo'
import MonoMapa from './MonoMapa'
/**
 * 
 * @param {*} estado: Estado de la casilla, puede ser 'default', 'agua', 'camino', 'selected'. El selected es un estado del 'default'
 * @returns 
 */
export const CasillaMapa = ({ estado = 'default', index, actualizarMapa, globos, monos  }) => {

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
        </div>

    )
}