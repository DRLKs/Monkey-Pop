import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import tituloJuego from '../assets/images/tituloJuego2.png';
import backgroundMusic from '../assets/sounds/musicaFondo.mp3';

import { cargarConfiguracion } from '../utils/funciones';

import '../styles/menu.css'

export function Menu() {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    useEffect(() => {
        // Obtener configuración de volumen desde localStorage
        const configuracionSonido = cargarConfiguracion();
        const isMuted = configuracionSonido.efectos;
        const savedVolume = configuracionSonido.volumen;
        
        // Convertir el volumen de escala 1-100 a escala 0-1
        // Si no hay valor guardado o está silenciado, usar valores predeterminados
        const normalizedVolume = isMuted ? 0 : (savedVolume ? parseInt(savedVolume) / 100 : 0.5);
        
        // Crear elemento de audio
        audioRef.current = new Audio(backgroundMusic);
        audioRef.current.loop = true;
        audioRef.current.volume = normalizedVolume;
        
        console.log(`Aplicando configuración de audio - Volumen: ${normalizedVolume * 100}%, Silenciado: ${isMuted}`);
        
        audioRef.current.play().catch(error => {
            // La reproducción automática puede ser bloqueada por el navegador
            console.log("Error al reproducir audio:", error);
        });

        // Función de limpieza para detener el audio cuando el componente se desmonte
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <>
        <div className="menu-page"></div>
        
        <div className='titulo-juego-container'>
                <img src={tituloJuego} alt='titulo'/>
        </div>

        <div className="menu-container">
            <button id="play-btn" className='menu-btn' onClick={() => navigate('/juego')}>Jugar</button>
            <button id="tutorial-btn" className='menu-btn' onClick={() => navigate('/tutorial')}>Tutorial</button>
            <button id="settings-btn" className='menu-btn' onClick={() => navigate('/ajustes')}>Ajustes</button>
            <button id="infomonos-btn" className='menu-btn' onClick={() => navigate('/monoInfo')}>Monos</button>
        </div>
        
        <footer>
            <a onClick={() => navigate('/creditos')}> Créditos </a>
            <a href='https://github.com/DRLKs/Monkey-Pop' > github </a>
            <a href='https://ninjakiwi.com/Games/Mobile/Bloons-TD-Battles-Mobile.html'> Bloons TD Battles </a>
        </footer>
        </>
    )
}

export default Menu