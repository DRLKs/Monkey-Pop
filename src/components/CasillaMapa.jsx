import React from 'react'
import '../styles/CasillaMapa.css'

/**
 * 
 * @param {*} estado: Estado de la casilla, puede ser 'default', 'agua', 'camino', 'agua_cesped1', 'agua_cesped2', 'tierra_cesped1', 'tierra_cesped2', 'selected'. El selected es un estado del 'default'
 * @returns 
 */
export const CasillaMapa = ({ estado = 'default', index, actualizarMapa }) => {

    const manejarInteraccion = () => {
        actualizarMapa(index)
    }

    return (
        <div 
            onClick={manejarInteraccion} 
            onTouchStart={manejarInteraccion}
            className={`casilla-mapa casilla-${estado}`}
            data-index={index}
        >
        </div>

    )
}