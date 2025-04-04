import React from 'react'
import { useNavigate } from 'react-router-dom'
import tituloJuego from '../assets/images/tituloJuego2.png';

import '../styles/menu.css'

export function Menu() {
    const navigate = useNavigate()

    return (
        <>
        <div className="menu-page"></div> {/* Configuración de un div que actuará como body */}
        
        <div className='titulo-juego-container'>
                <img src={tituloJuego} alt='titulo'/>
        </div>

        <div className="menu-container">
            <button id="play-btn" onClick={() => navigate('/juego')}>Jugar</button>
            <button id="settings-btn" onClick={() => navigate('/ajustes')}>Ajustes</button>
            <button id="ranking-btn" onClick={() => navigate('/ranking')}>Ranking</button>
        </div>
        
        <footer>
            <a onClick={() => navigate('/creditos')}> Créditos </a>
            <a href='https://github.com/DRLKs' > github </a>
        </footer>
        </>
        
    )
}

export default Menu