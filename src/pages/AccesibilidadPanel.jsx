import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../styles/accesibilidad.css';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { UIContext } from '../context/UIContext';

const AccesibilidadPanel = () => {
  const navigate = useNavigate();
  const { accessibilitySettings, updateAccessibilitySetting } = useContext(UIContext);

  // Efecto para anunciar la página a lectores de pantalla
  useEffect(() => {
    // Notificar a tecnologías asistivas que la página ha cargado
    const pageLoadAnnouncement = document.createElement('div');
    pageLoadAnnouncement.setAttribute('role', 'status');
    pageLoadAnnouncement.setAttribute('aria-live', 'polite');
    pageLoadAnnouncement.className = 'sr-only'; // Solo para lectores de pantalla
    pageLoadAnnouncement.textContent = 'Página de opciones de accesibilidad cargada';
    document.body.appendChild(pageLoadAnnouncement);

    // Limpiar después de anunciar
    return () => {
      document.body.removeChild(pageLoadAnnouncement);
    };
  }, []);

  const handleSaveAndReturn = () => {
    // Anunciar a lectores de pantalla que los cambios se han guardado
    const savedAnnouncement = document.createElement('div');
    savedAnnouncement.setAttribute('role', 'alert');
    savedAnnouncement.setAttribute('aria-live', 'assertive');
    savedAnnouncement.className = 'sr-only';
    savedAnnouncement.textContent = 'Configuración guardada. Volviendo al menú principal.';
    document.body.appendChild(savedAnnouncement);
    
    // Pequeño retraso para que el lector de pantalla tenga tiempo de anunciar
    setTimeout(() => {
      navigate('/');
      document.body.removeChild(savedAnnouncement);
    }, 500);
  };

  // Manejar atajos de teclado para accesibilidad
  useEffect(() => {
    const handleKeyDown = (event) => {
      // ESC para volver al menú principal
      if (event.key === 'Escape') {
        handleSaveAndReturn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Monkey Pop - Opciones de Accesibilidad</title>
        <meta name="description" content="Configura las opciones de accesibilidad de Monkey Pop para adaptarlo a tus necesidades" />
        <html lang="es" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#2a5a8a" />
      </Helmet>

      {/* SVG Filters para daltonismo - ocultos visualmente pero disponibles para CSS */}
      <svg className="color-filters" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix 
              in="SourceGraphic"
              type="matrix" 
              values="0.567, 0.433, 0, 0, 0 
                      0.558, 0.442, 0, 0, 0 
                      0, 0.242, 0.758, 0, 0 
                      0, 0, 0, 1, 0" 
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix 
              in="SourceGraphic" 
              type="matrix" 
              values="0.625, 0.375, 0, 0, 0 
                      0.7, 0.3, 0, 0, 0 
                      0, 0.3, 0.7, 0, 0 
                      0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix 
              in="SourceGraphic" 
              type="matrix" 
              values="0.95, 0.05, 0, 0, 0 
                      0, 0.433, 0.567, 0, 0 
                      0, 0.475, 0.525, 0, 0 
                      0, 0, 0, 1, 0" 
            />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix 
              in="SourceGraphic" 
              type="matrix" 
              values="0.299, 0.587, 0.114, 0, 0 
                      0.299, 0.587, 0.114, 0, 0 
                      0.299, 0.587, 0.114, 0, 0 
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="accesibilidad-page" role="main">
        <BarraNavegacion />
        
        <div className="accesibilidad-contenedor-principal">
          <div className="accesibilidad-titulo-seccion">
            <h1 id="page-title" tabIndex="-1">Opciones de Accesibilidad</h1>
            <p className="accesibilidad-descripcion">
              Personaliza el juego para adaptarlo a tus necesidades. Estos ajustes se aplicarán a todo el juego.
            </p>
          </div>
          
          <div className="accesibilidad-tarjeta" role="region" aria-labelledby="visual-options">
            <h2 id="visual-options" className="accesibilidad-seccion-titulo">Opciones Visuales</h2>
            
            <div className="accesibilidad-opcion">
              <div className="opcion-header">
                <span className="opcion-label" id="contrast-label">Alto contraste</span>
                <p className="opcion-descripcion">Mejora la diferenciación entre elementos para mayor visibilidad</p>
              </div>
              <div className="input-container">
                <input 
                  id="alto-contraste"
                  type="checkbox" 
                  aria-labelledby="contrast-label"
                  checked={accessibilitySettings.highContrast} 
                  onChange={(e) => updateAccessibilitySetting('highContrast', e.target.checked)} 
                />
              </div>
            </div>
            
            <div className="accesibilidad-opcion">
              <div className="opcion-header">
                <span className="opcion-label" id="colorblind-label">Modo daltonismo</span>
                <p className="opcion-descripcion">Ajusta los colores para diferentes tipos de daltonismo</p>
              </div>
              <div className="input-container">
                <select 
                  id="modo-daltonismo"
                  aria-labelledby="colorblind-label"
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
            </div>
            
            <div className="accesibilidad-opcion">
              <div className="opcion-header">
                <span className="opcion-label" id="text-size-label">Tamaño de texto</span>
                <p className="opcion-descripcion">Ajusta el tamaño del texto para mejor legibilidad</p>
              </div>
              <div className="input-container">
                <select 
                  id="tamano-texto"
                  aria-labelledby="text-size-label"
                  value={accessibilitySettings.textSize} 
                  onChange={(e) => updateAccessibilitySetting('textSize', e.target.value)}
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
          </div>
          

          
          <div className="accesibilidad-acciones">
            <button 
              className="accesibilidad-btn-guardar"
              onClick={handleSaveAndReturn}
              aria-label="Guardar configuración y volver al menú principal"
            >
              Guardar y Volver
            </button>
          </div>
          
          <div className="accesibilidad-info">
            <p>Pulsa ESC en cualquier momento para guardar y volver al menú principal.</p>
            <p>Para obtener ayuda adicional, contacta con nosotros en <a href="mailto:soporte@monkeypop.com">soporte@monkeypop.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccesibilidadPanel;