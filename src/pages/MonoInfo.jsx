import React, { useState, useEffect, useRef, useContext } from "react";

import { BarraNavegacion } from '../components/BarraNavegacion';
import AjustesMono from "../components/AjustesMono";
import { MONOS } from "../utils/constantes";
import { UIContext } from "../context/UIContext";

// Importamos la música específica para la sección de información de monos
import musica from '../assets/sounds/MonoInfo.mp3';
import backgroundMusic from '../assets/sounds/menuPrincipal.mp3';

import '../styles/infoMonos.css';

function MonoInfo() {
    const [verAjustesMono, setVerAjustesMono] = useState(null);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    
    // Obtenemos la función para cambiar música del contexto
    const { changeBackgroundMusic } = useContext(UIContext);

    const cerrarAjustes = () => {
        setVerAjustesMono(null);
    };

    // Función para verificar si se puede hacer scroll
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // -10 para un pequeño margen
        }
    };

    // Función para hacer scroll horizontal con botones
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };    // Comprobar el estado de scroll al montar y cuando cambie el tamaño
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, []);
    
    // Efecto para cambiar la música cuando se monta el componente
    useEffect(() => {
        // Cambiar a la música de la sección de información de monos
        changeBackgroundMusic(musica);
        
        // Restaurar la música original cuando se desmonte el componente
        return () => {
            changeBackgroundMusic(backgroundMusic);
        };
    }, [changeBackgroundMusic]);

    return (
        <div className="pagina-mono-info">
            <BarraNavegacion />
            
            {/* Separador para evitar la superposición con la barra de navegación */}
            <div className="separador-navbar"></div>
            
            <div className="scroll-container-wrapper">
                {canScrollLeft && <button className="scroll-button left" onClick={() => scroll('left')}>◀</button>}
                
                <div 
                    ref={scrollContainerRef}
                    className="contenedor-monos"
                    onScroll={checkScroll}
                >
                    {Object.values(MONOS).map((mono) => (
                        <div 
                            key={mono.tipo || mono.id}
                            className="tarjeta-mono"
                        >
                            <img src={mono.imagen} alt={mono.nombre} className="imagen-mono" />
                            
                            <div className="info-texto-mono">
                                <h3>{mono.nombre}</h3>
                                <p><strong>Precio:</strong> ${mono.precio}</p>
                                <p><strong>Rango:</strong> {mono.rango}</p>
                                <p><strong>Velocidad:</strong> {mono.tiempoRecarga}s</p>
                                <p><strong>Daño:</strong> {mono.damage}</p>
                                <p className="descripcion-mono">{mono.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {canScrollRight && <button className="scroll-button right" onClick={() => scroll('right')}>▶</button>}
            </div>

            {verAjustesMono !== null && (
                <AjustesMono
                    mono={verAjustesMono} 
                    tipo={verAjustesMono.tipo}
                    venderMono={() => {
                        console.log("Vender mono no aplica en la página de información general");
                    }}
                    cerrar={cerrarAjustes}
                />
            )}
        </div>
    );
}

export default MonoInfo;