import { useState, useRef } from 'react';
import { MONOS } from "../utils/constantes";

export const MonoBarraNavegador = ({ tipo, agarrarMono, sePuedeComprar }) => {
    const [isDragging, setIsDragging] = useState(false);
    const touchStartTime = useRef(null);
    const hasMoved = useRef(false);

    // Resetear estados
    const resetStates = () => {
        setIsDragging(false);
        hasMoved.current = false;
        touchStartTime.current = null;
    };

    // Función unificada para obtener mono
    const obtenerMono = () => {
        if (sePuedeComprar) {
            agarrarMono(tipo);
        }
    };

    // Eventos de escritorio
    const handleClick = () => {
        if (!hasMoved.current) {
            obtenerMono();
        }
    };

    const handleDragStart = (e) => {
        if (sePuedeComprar) {
            obtenerMono();
            e.dataTransfer.setData('text/plain', tipo);
            e.dataTransfer.effectAllowed = 'move';
        } else {
            e.preventDefault();
        }
    };

    const handleDragEnd = () => {
        resetStates();
    };

    // Eventos móviles
    const handleTouchStart = () => {
        if (sePuedeComprar) {
            touchStartTime.current = Date.now();
            hasMoved.current = false;
            setIsDragging(true);
        }
    };

    const handleTouchMove = (e) => {
        if (!sePuedeComprar || !isDragging) return;

        hasMoved.current = true;
        e.preventDefault();
        
        const timeDiff = Date.now() - touchStartTime.current;
        if (timeDiff > 100) {
            obtenerMono();
        }
    };

    const handleTouchEnd = () => {
        if (!sePuedeComprar || !isDragging) return;

        const timeDiff = Date.now() - touchStartTime.current;
        
        // Tap rápido sin movimiento
        if (!hasMoved.current && timeDiff < 200) {
            obtenerMono();
        }
        
        resetStates();
    };

    const monkeyData = MONOS[tipo];

    return (
        <main id={`monkey-${tipo}`} className={`monkey${!sePuedeComprar ? ' disabled' : ''}`}>
            <img 
                src={monkeyData.imagen} 
                alt={`Monkey ${tipo}`} 
                className="monkey-img" 
                draggable={sePuedeComprar}
                onClick={handleClick}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    touchAction: sePuedeComprar ? 'none' : 'auto',
                    userSelect: 'none'
                }}
            />
            <span className="monkey-count">{monkeyData.precio}</span>
        </main>
    );
};
