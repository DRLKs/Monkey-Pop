import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import tituloJuego from '../assets/images/tituloJuego2.png';

import '../styles/menu.css'

export function Menu() {
    const navigate = useNavigate();
    

    return (
        <>
        <div className="menu-page"></div>
        
        <div className='menu-container-container'>
            <div className='titulo-juego-container'>
                    <img src={tituloJuego} alt='titulo'/>
            </div>

            <div className="menu-container">
                <button id="play-btn" className='menu-btn' onClick={() => navigate('/juego')}>Jugar</button>
                <button id="tutorial-btn" className='menu-btn' onClick={() => navigate('/tutorial')}>Tutorial</button>
                <button id="settings-btn" className='menu-btn' onClick={() => navigate('/ajustes')}>Ajustes</button>
                <button id="infomonos-btn" className='menu-btn' onClick={() => navigate('/monoInfo')}>Monos</button>
            </div>
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