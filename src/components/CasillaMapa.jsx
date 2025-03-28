import React from 'react'
import '../styles/CasillaMapa.css'

import Globo from './Globo'
/**
 * 
 * @param {*} estado: Estado de la casilla, puede ser 'default', 'agua', 'camino', 'selected'. El selected es un estado del 'default'
 * @returns 
 */
export const CasillaMapa = ({ estado = 'default', index, actualizarMapa, globos  }) => {

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
        </div>

    )
}