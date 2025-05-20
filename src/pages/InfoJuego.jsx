import React, { useState, useEffect, useContext } from "react";
import { BarraNavegacion } from '../components/BarraNavegacion';
import { UIContext } from "../context/UIContext";

// Importamos las imágenes para la sección de información
import monoAncianoImg from '../assets/images/tutorial/monoAncianoPrincipio.webp';
import globoMalvado from '../assets/images/tutorial/globoMalvado.webp';
import proTipImage from '../assets/images/tutorial/proTip.webp';

// Importamos imágenes de monos para la sección de estrategia
import monoBasico from '../assets/images/monkeys/monoBasico.webp';
import monoArco from '../assets/images/monkeys/en .webp/monoArco.webp';
import monoFusil from '../assets/images/monkeys/en .webp/monoFusil.webp';
import monoArtificiero from '../assets/images/monkeys/en .webp/monoArtificiero.webp';
import monoFrancotirador from '../assets/images/monkeys/en .webp/monoFrancotirador.webp';
import monoLaser from '../assets/images/monkeys/en .webp/monoLaser.webp';

// Importamos imágenes de mapa para la sección de mapas
import fondoJuego from '../assets/images/backgrounds/fondoJuego.webp';

// Estilos
import '../styles/infoJuego.css';

function InfoJuego() {
    const [activeTab, setActiveTab] = useState('historia');
    const { changeBackgroundMusic } = useContext(UIContext);
    
    useEffect(() => {
        // Cambiar la música de fondo cuando se carga el componente
        changeBackgroundMusic('../assets/sounds/musicaFondo.mp3');
        
        return () => {
            // Restaurar la música original al salir
            changeBackgroundMusic('../assets/sounds/musicaFondo.mp3');
        };
    }, [changeBackgroundMusic]);

    const renderTabContent = () => {
        switch(activeTab) {
            case 'historia':
                return (
                    <div className="info-content historia-content">
                        <div className="info-header">
                            <img src={monoAncianoImg} alt="Anciano Mono" className="personaje-imagen" />
                            <h2>La historia de Monkey Pop</h2>
                        </div>
                        <div className="info-text">
                            <p>En un mundo donde los monos viven en armonía, una amenaza ha surgido: los globos malvados están invadiendo nuestros bosques y selvas.</p>
                            <p>El sabio mono anciano nos ha encomendado la misión de defender nuestro hogar utilizando diferentes tipos de monos con habilidades únicas.</p>
                            <div className="info-image-container">
                                <img src={globoMalvado} alt="Globo Malvado" className="info-image" />
                                <p className="image-caption">Los globos vienen en diferentes colores, cada uno con distinta resistencia</p>
                            </div>
                            <p>Cada ronda trae globos más resistentes y numerosos. ¡Prepara tus defensas y no dejes que ningún globo llegue al final del camino!</p>
                        </div>
                    </div>
                );
            case 'objetivos':
                return (
                    <div className="info-content objetivos-content">
                        <div className="info-header">
                            <img src={proTipImage} alt="Pro Tip" className="personaje-imagen" />
                            <h2>Objetivos del juego</h2>
                        </div>
                        <div className="info-text">
                            <h3>Objetivo principal</h3>
                            <p>Sobrevive la mayor cantidad de rondas posible evitando que los globos lleguen al final del camino.</p>

                            <div className="objetivo-item">
                                <h4>1. Defender el camino</h4>
                                <p>Coloca monos estratégicamente para impedir que los globos lleguen al final del recorrido.</p>
                            </div>

                            <div className="objetivo-item">
                                <h4>2. Gestionar recursos</h4>
                                <p>Administra bien tus monedas: invierte en nuevos monos o mejora los existentes.</p>
                            </div>

                            <div className="objetivo-item">
                                <h4>3. Sobrevivir rondas</h4>
                                <p>Cada ronda aumenta en dificultad con globos más resistentes y numerosos.</p>
                            </div>

                            <div className="info-importante">
                                <h4>Recuerda:</h4>
                                <p>¡Pierdes vidas cuando los globos logran llegar al final del camino!</p>
                            </div>
                        </div>
                    </div>
                );
            case 'controles':
                return (
                    <div className="info-content controles-content">
                        <h2>Controles del juego</h2>
                        
                        <div className="controles-section">
                            <h3>Controles con ratón</h3>
                            <ul>
                                <li><strong>Click en mono de la barra:</strong> Seleccionar un tipo de mono para colocar</li>
                                <li><strong>Click en el mapa:</strong> Colocar el mono seleccionado</li>
                                <li><strong>Click en un mono colocado:</strong> Ver opciones de mejora y venta</li>
                            </ul>
                        </div>

                        <div className="controles-section">
                            <h3>Controles de teclado</h3>
                            <ul>
                                <li><strong>1-6:</strong> Seleccionar diferentes tipos de monos</li>
                                <li><strong>0:</strong> Cancelar selección de mono</li>
                                <li><strong>ESC:</strong> Abrir menú de ajustes</li>
                                <li><strong>Espacio o P:</strong> Pausar/Reanudar el juego</li>
                            </ul>
                        </div>

                        <div className="controles-section">
                            <h3>Controles móviles</h3>
                            <ul>
                                <li><strong>Toque en mono:</strong> Seleccionar un tipo de mono</li>
                                <li><strong>Toque en mapa:</strong> Colocar mono seleccionado</li>
                                <li><strong>Toque en mono colocado:</strong> Ver opciones</li>
                                <li><strong>Botón de pausa:</strong> Pausar/Reanudar el juego</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'estrategias':
                return (
                    <div className="info-content estrategias-content">
                        <h2>Estrategias de juego</h2>
                        
                        <div className="estrategia-item">
                            <h3>Posicionamiento</h3>
                            <p>Coloca monos en puntos estratégicos donde puedan cubrir la mayor parte del camino. Las curvas son especialmente buenas para posicionar monos de largo alcance.</p>
                        </div>

                        <div className="estrategia-item">
                            <h3>Combinación de monos</h3>
                            <div className="estrategia-monos">
                                <div className="mono-estrategia">
                                    <img src={monoBasico} alt="Mono Básico" />
                                    <p>Económicos para el inicio</p>
                                </div>
                                <div className="mono-estrategia">
                                    <img src={monoArco} alt="Mono Arco" />
                                    <p>Buena velocidad de ataque</p>
                                </div>
                                <div className="mono-estrategia">
                                    <img src={monoArtificiero} alt="Mono Artificiero" />
                                    <p>Daño en área para grupos</p>
                                </div>
                                <div className="mono-estrategia">
                                    <img src={monoFrancotirador} alt="Mono Francotirador" />
                                    <p>Gran alcance y daño</p>
                                </div>
                            </div>
                        </div>

                        <div className="estrategia-item">
                            <h3>Gestión económica</h3>
                            <p>En las primeras rondas, invierte en monos económicos para generar ingresos. A medida que avanzan las rondas, mejora tus monos existentes o adquiere monos más potentes.</p>
                        </div>
                        
                        <div className="estrategia-item">
                            <h3>Consejos Pro</h3>
                            <ul>
                                <li>Mejora primero los monos en posiciones estratégicas</li>
                                <li>Coloca monos con daño en área en zonas donde los globos se acumulan</li>
                                <li>Mantén monos de largo alcance en puntos elevados o curvas</li>
                                <li>No gastes todas tus monedas; guarda algunas para emergencias</li>
                            </ul>
                        </div>
                    </div>
                );
            default:
                return <div>Selecciona una pestaña para ver información</div>;
        }
    };

    return (
        <div className="info-juego-container">
            <div className="info-juego-background"></div>
            <BarraNavegacion />
            
            <div className="info-juego-content">
                <h1>Información del Juego</h1>
                
                <div className="info-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'historia' ? 'active' : ''}`}
                        onClick={() => setActiveTab('historia')}
                    >
                        Historia
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'objetivos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('objetivos')}
                    >
                        Objetivos
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'controles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('controles')}
                    >
                        Controles
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'estrategias' ? 'active' : ''}`}
                        onClick={() => setActiveTab('estrategias')}
                    >
                        Estrategias
                    </button>
                </div>
                
                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

export default InfoJuego;
