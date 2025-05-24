import React, { use, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


// Función para saber si el usuario puede jugar
import { habilitadoParaJugar, puedeJugar } from '../utils/funciones.js'

import candadoCerrado from '../assets/images/tutorial/candadoTutorialCerrado.webp'
import candadoAbierto from '../assets/images/tutorial/candadoTutorialAbierto.webp'

// Importamos las imágenes del título
import tituloJuego from '../assets/images/tituloJuego.webp';

// Importamos el icono de accesibilidad
import iconoAccesibilidad from '../assets/images/botones/icono-accesibilidad.png';

import '../styles/menu.css'

export function Menu() {
    
    const navigate = useNavigate();
    
    const [mostrarConfirmacionJugar, setMostrarConfirmacionJugar] = React.useState(false);
    const [jugarActivo, setPuedeJugar] = React.useState(habilitadoParaJugar());


    /**
     * Verifica en el localStorage si
     * el usuario ha completado el tutorial o si quiere jugar ya.
     */
    useEffect(() => {
        const puedeJugarAux = habilitadoParaJugar();
        setPuedeJugar(puedeJugarAux);
    }, [mostrarConfirmacionJugar]);


    return (
        <>
        <Helmet>
            <title>Monkey Pop - Menú Principal</title>
        </Helmet>
        <div className="menu-page"></div>
        
        {/* Botón de accesibilidad fijo en esquina */}
        <button 
            className="accesibilidad-flotante" 
            aria-label="Opciones de accesibilidad"
            onClick={() => navigate('/accesibilidad')}
        >
            <img 
                src={iconoAccesibilidad} 
                alt="Accesibilidad" 
                className="icono-accesibilidad-flotante"
            />
        </button>
        
        <div className='menu-container-container'>
            <header className='titulo-juego-container'>
                    <img src={tituloJuego} alt='Título'/>
                    {/* h1 con el titulo de la pagina oculto */}
                    <h1 className='visually-hidden'>Página de inicio</h1>
            </header>

            <div className="menu-container">                
                <button 
                    id="play-btn" 
                    className={`menu-btn ${!jugarActivo ? 'btn-oscuro' : ''}`}
                    onClick={() => jugarActivo ? navigate('/juego') : setMostrarConfirmacionJugar(true)}
                >
                <img 
                    src={ habilitadoParaJugar() ? candadoAbierto : candadoCerrado} 
                    alt="Candado" 
                    className="icono-candado" 
                    />                    
                    <span>Jugar</span>
                </button>
                <button id="tutorial-btn" className='menu-btn' onClick={() => navigate('/tutorial')}>Tutorial</button>
                {/* Quitamos el botón de accesibilidad del menú ya que ahora está en la esquina */}
                <button id="settings-btn" className='menu-btn' onClick={() => navigate('/ajustes')}>Ajustes</button>
                <button id="infomonos-btn" className='menu-btn' onClick={() => navigate('/monoInfo')}>Monos</button>
            </div>
        </div>
        

        {mostrarConfirmacionJugar && (
            <div className="modal-confirmacion">
                <main className="modal-contenido">
                    <button 
                        className="modal-cerrar-btn" 
                        onClick={() => setMostrarConfirmacionJugar(false)}
                    >
                        ×
                    </button>
                    <aside className="modal-header">
                        <h1>¡Atención!</h1>
                        <img 
                            src={candadoCerrado} 
                            alt="Candado cerrado" 
                            className="modal-icono-candado" 
                        />
                    </aside>
                    <p>No has completado el tutorial aún. ¿Estás seguro que deseas continuar sin hacerlo?</p>
                    <aside className="modal-botones">
                        <button 
                            className="menu-btn btn-primario" 
                            onClick={() => {
                                setMostrarConfirmacionJugar(false);
                                navigate('/tutorial');
                            }}
                        >
                            Ir al Tutorial
                        </button>
                        <button 
                            className="menu-btn btn-secundario" 
                            onClick={() => {
                                setMostrarConfirmacionJugar(false);
                                puedeJugar();
                            }}
                        >
                            Jugar
                        </button>
                    </aside>
                </main>
            </div>
        )}

        <footer>
            <Link to="/creditos">Créditos</Link>
            <a href='https://github.com/DRLKs/Monkey-Pop' > github </a>
            <a href='https://ninjakiwi.com/Games/Mobile/Bloons-TD-Battles-Mobile.html'> Bloons TD Battles </a>
            <Link to="/infoJuego">Historia</Link>
        </footer>
        </>
    )
}

export default Menu