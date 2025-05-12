import React, { use, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import tituloJuego from '../assets/images/tituloJuego2.png';

// Función para saber si el usuario puede jugar
import { habilitadoParaJugar, puedeJugar } from '../utils/funciones.js'

import candadoCerrado from '../assets/images/tutorial/candadoTutorialCerrado.png'
import candadoAbierto from '../assets/images/tutorial/candadoTutorialAbierto.png'

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
        <div className="menu-page"></div>
        
        <div className='menu-container-container'>
            <div className='titulo-juego-container'>
                    <img src={tituloJuego} alt='titulo'/>
            </div>

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
                <button id="settings-btn" className='menu-btn' onClick={() => navigate('/ajustes')}>Ajustes</button>
                <button id="infomonos-btn" className='menu-btn' onClick={() => navigate('/monoInfo')}>Monos</button>
            </div>
        </div>
        

        {mostrarConfirmacionJugar && (
            <div className="modal-confirmacion">
                <div className="modal-contenido">
                    <button 
                        className="modal-cerrar-btn" 
                        onClick={() => setMostrarConfirmacionJugar(false)}
                    >
                        ×
                    </button>
                    <div className="modal-header">
                        <h2>¡Atención!</h2>
                        <img 
                            src={candadoCerrado} 
                            alt="Candado cerrado" 
                            className="modal-icono-candado" 
                        />
                    </div>
                    <p>No has completado el tutorial aún. ¿Estás seguro que deseas continuar sin hacerlo?</p>
                    <div className="modal-botones">
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
                    </div>
                </div>
            </div>
        )}

        <footer>
            <a onClick={() => navigate('/creditos')}> Créditos </a>
            <a href='https://github.com/DRLKs/Monkey-Pop' > github </a>
            <a href='https://ninjakiwi.com/Games/Mobile/Bloons-TD-Battles-Mobile.html'> Bloons TD Battles </a>
        </footer>
        </>
    )
}

export default Menu