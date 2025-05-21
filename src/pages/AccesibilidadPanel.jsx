import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/accesibilidad.css';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { UIContext } from '../context/UIContext';

const AccesibilidadPanel = () => {
  const navigate = useNavigate();
  const { accessibilitySettings, updateAccessibilitySetting } = useContext(UIContext);

  const handleSaveAndReturn = () => {
    navigate('/');
  };

  return (
    <>
    <Helmet>
      <title>Monkey Pop - Accesibilidad</title>
    </Helmet>

    <div className="accesibilidad-page">
      <BarraNavegacion />
      
      <div className="accesibilidad-contenedor-principal">
        <h1 className="accesibilidad-titulo">Opciones de Accesibilidad</h1>
        
        <div className="accesibilidad-tarjeta">
          <h2>Opciones Visuales</h2>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="alto-contraste">Alto contraste</label>
            <input 
              id="alto-contraste"
              type="checkbox" 
              checked={accessibilitySettings.highContrast} 
              onChange={(e) => updateAccessibilitySetting('highContrast', e.target.checked)} 
            />
          </div>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="modo-daltonismo">Modo daltonismo</label>
            <select 
              id="modo-daltonismo"
              value={accessibilitySettings.colorblindMode} 
              onChange={(e) => updateAccessibilitySetting('colorblindMode', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="protanopia">Protanopia (rojo)</option>
              <option value="deuteranopia">Deuteranopia (verde)</option>
              <option value="tritanopia">Tritanopia (azul)</option>
              <option value="achromatopsia">Acromatopsia (sin color)</option>
            </select>
          </div>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="tamano-texto">Tamaño de texto</label>
            <select 
              id="tamano-texto"
              value={accessibilitySettings.textSize} 
              onChange={(e) => updateAccessibilitySetting('textSize', e.target.value)}
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
          </div>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="reducir-movimiento">Reducir movimiento</label>
            <input 
              id="reducir-movimiento"
              type="checkbox" 
              checked={accessibilitySettings.reduceMotion} 
              onChange={(e) => updateAccessibilitySetting('reduceMotion', e.target.checked)} 
            />
          </div>
        </div>
        
        <div className="accesibilidad-tarjeta">
          <h2>Opciones de Jugabilidad</h2>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="velocidad-juego">Velocidad del juego</label>
            <select 
              id="velocidad-juego"
              value={accessibilitySettings.gameSpeed} 
              onChange={(e) => updateAccessibilitySetting('gameSpeed', e.target.value)}
            >
              <option value="slow">Lento</option>
              <option value="normal">Normal</option>
              <option value="fast">Rápido</option>
            </select>
          </div>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="descripciones-audio">Descripciones de audio</label>
            <input 
              id="descripciones-audio"
              type="checkbox" 
              checked={accessibilitySettings.audioDescriptions} 
              onChange={(e) => updateAccessibilitySetting('audioDescriptions', e.target.checked)} 
            />
          </div>
          
          <div className="accesibilidad-opcion">
            <label htmlFor="navegacion-teclado">Navegación por teclado</label>
            <input 
              id="navegacion-teclado"
              type="checkbox" 
              checked={accessibilitySettings.keyboardNavigation} 
              onChange={(e) => updateAccessibilitySetting('keyboardNavigation', e.target.checked)} 
            />
          </div>
        </div>
        
        <button 
          className="accesibilidad-btn-guardar"
          onClick={handleSaveAndReturn}
        >
          Guardar y Volver
        </button>
      </div>
    </div>
    </>
  );
};

export default AccesibilidadPanel;