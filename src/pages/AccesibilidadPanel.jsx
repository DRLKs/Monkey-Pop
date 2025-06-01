/**
 * Panel de configuración de accesibilidad para el juego Monkey Pop
 * 
 * Este componente @see {@link AccesibilidadPanel} proporciona opciones para personalizar la experiencia del juego
 * según las necesidades de accesibilidad del usuario, incluyendo:
 * - Opciones visuales (alto contraste, tamaño de texto)
 * - Configuraciones para daltonismo usando {@link ColorBlindFilters}
 * - Navegación por teclado y tecnologías asistivas
 * 

 * 
 * @see {@link UIContext} - Contexto que maneja la configuración de accesibilidad
 * @see {@link BarraNavegacion} - Componente de navegación principal
 * @see {@link ColorBlindFilters} - Componente con filtros SVG para daltonismo
 */



// Librerias de react
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion';
import ColorBlindFilters, { COLORBLIND_FILTERS } from '../components/accesibilidad/ColorBlindFilters';

// Contexto
import { UIContext } from '../context/UIContext';

// Estilos 
import '../styles/accesibilidad/accesibilidad.css';

/**
 * Componente principal del panel de accesibilidad
 * 
 * Gestiona todas las opciones de accesibilidad disponibles en el juego
 * y proporciona una interfaz accesible para configurarlas.
 * 
 * @function
 * @returns {JSX.Element} El panel de accesibilidad renderizado
 */
const AccesibilidadPanel = () => {

  const navigate = useNavigate();

  const { accessibilitySettings, updateAccessibilitySetting } = useContext(UIContext);


  /**
   * Hook de efecto para manejar atajos de teclado de accesibilidad
   * 
   * Gestiona los siguientes atajos:
   * - ESC: Volver al menú principal
   * 
   * @function
   */
  useEffect(() => {
    /**
     * Manejador de eventos de teclado para atajos de accesibilidad
     * 
     * @param {KeyboardEvent} event - Evento de teclado
     */
    const handleKeyDown = (event) => {
      // ESC para volver al menú principal
      if (event.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  /**
   * Renderiza el componente del panel de accesibilidad
   * 
   * Incluye:
   * - Metadatos SEO y accesibilidad en el head
   * - Filtros SVG importados desde {@link ColorBlindFilters}
   * - Opciones de configuración visual
   * 
   * @returns {JSX.Element} El JSX del panel de accesibilidad
   */
  return (
    <>
      {/* Metadatos del documento para SEO y accesibilidad */}
      <Helmet>
        <title>Monkey Pop - Opciones de Accesibilidad</title>
        <meta name="description" content="Configura las opciones de accesibilidad de Monkey Pop para adaptarlo a tus necesidades" />
        <html lang="es" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#2a5a8a" />
      </Helmet>

      {/* 
       * Filtros SVG para simulación de daltonismo
       * Importados desde el componente ColorBlindFilters para mejor reutilización
       * 
       * @see {@link ColorBlindFilters} - Componente que contiene todos los filtros SVG
       */}
      <ColorBlindFilters />

      <div className="accesibilidad-page" role="main">
        <BarraNavegacion funcionVolver={() => navigate('/')} />
        
        <div className="accesibilidad-contenedor-principal">
          <div className="accesibilidad-titulo-seccion">
            <h1 id="page-title" tabIndex="-1">Opciones de Accesibilidad</h1>
            <p className="accesibilidad-descripcion">
              Personaliza el juego para adaptarlo a tus necesidades. Estos ajustes se aplicarán a todo el juego.
            </p>
          </div>
          
          {/* Sección de opciones visuales */}
          <div className="accesibilidad-tarjeta" role="region" aria-labelledby="visual-options">
            <h2 id="visual-options" className="accesibilidad-seccion-titulo">Opciones Visuales</h2>
            
            {/* Opción de alto contraste */}
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
            
            {/* Selector de modo daltonismo usando constantes del componente ColorBlindFilters */}
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
                  <option value={COLORBLIND_FILTERS.NORMAL}>Normal</option>
                  <option value={COLORBLIND_FILTERS.PROTANOPIA}>Protanopia (rojo)</option>
                  <option value={COLORBLIND_FILTERS.DEUTERANOPIA}>Deuteranopia (verde)</option>
                  <option value={COLORBLIND_FILTERS.TRITANOPIA}>Tritanopia (azul)</option>
                  <option value={COLORBLIND_FILTERS.ACHROMATOPSIA}>Acromatopsia (sin color)</option>
                </select>
              </div>
            </div>
            
            {/* Selector de tamaño de texto */}
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
          
          
          {/* Información adicional y ayuda */}
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