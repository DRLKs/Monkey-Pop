import { useState } from 'react';

import { MONOS } from "../utils/constantes"


export const MonoBarraNavegador = ({ tipo, agarrarMono, sePuedeComprar }) => {

    const agarrar = () => {
        if (sePuedeComprar){
            agarrarMono(tipo)
        } 
    }

    const handleMouseDown = () => {
        if (sePuedeComprar) {
            agarrar();
            // Opcional: Puedes también llamar a agarrarMono aquí si quieres
            // que se active inmediatamente al presionar
        }
    };

    return (
        <div id={`'monkey-${tipo}'`} className={`monkey${!sePuedeComprar ? ' disabled' : ''}`}>
            <img 
                src={  MONOS[tipo].imagen } 
                alt={`Monkey ${tipo}`} 
                className={'monkey-img' }
                onMouseDown={handleMouseDown}
            />
            <span className="monkey-count">{ MONOS[tipo].precio }</span>
        </div>
    )
}
