import { useState } from 'react';
import { MONOS } from "../utils/constantes"

export const MonoBarraNavegador = ({ tipo, agarrarMono, sePuedeComprar }) => {

    // Función para manejar el toque/clic
    const handleInteraction = () => {
        if (sePuedeComprar) {
            agarrarMono(tipo);
        }
    };

    return (
        <div id={`'monkey-${tipo}'`} className={`monkey${!sePuedeComprar ? ' disabled' : ''}`}>
            <img 
                src={MONOS[tipo].imagen} 
                alt={`Monkey ${tipo}`} 
                className={'monkey-img'} 
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
                onMouseDown={handleInteraction}
            />
            <span className="monkey-count">{MONOS[tipo].precio}</span>
        </div>
    )
}
