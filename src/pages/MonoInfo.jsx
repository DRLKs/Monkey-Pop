import React, { useState, useEffect, useRef, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

import { BarraNavegacion } from '../components/BarraNavegacion';
import AjustesMono from "../components/AjustesMono";
import { MONOS } from "../utils/constantes";
import { UIContext } from "../context/UIContext";

import '../styles/monoInfo.css';

function MonoInfo() {

    const navigate = useNavigate();

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
            const scrollAmount = direction === 'left' ? -600 : 600;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Comprobar el estado de scroll al montar y cuando cambie el tamaño
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
    
    return (
        <>
        <Helmet>
            <title>Monkey Pop - Información de Monos</title>
        </Helmet>
        <div className="pagina-mono-info">
            {/* Agregamos encabezados semánticos para definir regiones de página */}
            <header>
                <BarraNavegacion funcionVolver ={() => navigate('/')}/>
                <html lang="es" />
            </header>
            
            {/* Separador para evitar la superposición con la barra de navegación */}
            <div className="separador-navbar"></div>
            
            {/* Agregamos main como región principal del documento */}
            <main>
                {/* Envolvemos el título en un contenedor con fondo para mejorar contraste */}
                <div className="titulo-principal-wrapper">
                    <h1 className="titulo-principal">Información de Monos</h1>
                </div>
                
                <div className="scroll-container-wrapper">
                    {canScrollLeft && (
                        <button 
                            className="scroll-button left" 
                            onClick={() => scroll('left')}
                            aria-label="Desplazar hacia la izquierda"
                        >
                            ◀
                        </button>
                    )}
                    
                    <div 
                        ref={scrollContainerRef}
                        className="contenedor-monos"
                        onScroll={checkScroll}
                        aria-label="Galería de monos"
                    >
                        {Object.values(MONOS).map((mono) => (
                            <div 
                                key={mono.tipo || mono.id}
                                className="tarjeta-mono"
                            >
                                {/* Corregimos texto alternativo redundante */}
                                <img 
                                    src={mono.imagen} 
                                    alt="" 
                                    className="imagen-mono" 
                                    aria-hidden="true"
                                />
                                
                                <div className="info-texto-mono">
                                    {/* Cambiamos h3 por h2 para no saltar niveles de encabezado */}
                                    <h2 className="nombre-mono">{mono.nombre}</h2>
                                    <p><strong>Precio:</strong> ${mono.precio}</p>
                                    <p><strong>Rango:</strong> {mono.rango}</p>
                                    <p><strong>Velocidad:</strong> {mono.tiempoRecarga}s</p>
                                    <p><strong>Daño:</strong> {mono.damage}</p>
                                    <p className="descripcion-mono">{mono.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {canScrollRight && (
                        <button 
                            className="scroll-button right" 
                            onClick={() => scroll('right')}
                            aria-label="Desplazar hacia la derecha"
                        >
                            ▶
                        </button>
                    )}
                </div>
            </main>

            {/* Modal/diálogo para ajustes */}
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
        </>
    );
}

export default MonoInfo;