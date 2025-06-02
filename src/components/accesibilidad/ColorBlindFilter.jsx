/**
 * Este componente es el que realmente funciona como filtro
 * 
 * Explicandolo de manera sencilla, está por encima de todas 
 * las páginas del juego, por tanto, al realizarle un filtro a 
 * este componente en el css, se le aplica un filtro a toda la 
 * web. El css de este componente es global.
 */


// Librerias de react
import React, { useContext } from 'react';
import { UIContext } from '../../context/UIContext';

// Estilos
import '../../styles/accesibilidad/colorblind-filters.css';

const ColorBlindFilter = () => {
  const { accessibilitySettings } = useContext(UIContext);
  
  // No renderizar si no hay filtros activos
  if (accessibilitySettings.colorblindMode === 'normal' && !accessibilitySettings.highContrast) {
    return null;
  }
  
  // Construir clases CSS para combinar filtros
  let filterClasses = 'global-filter';
  
  // Añadir clase del modo daltonismo si está activo
  if (accessibilitySettings.colorblindMode !== 'normal') {
    filterClasses += ` ${accessibilitySettings.colorblindMode}`;
  }
  
  // Añadir clase de alto contraste si está activo
  if (accessibilitySettings.highContrast) {
    filterClasses += ' high-contrast';
  }
  
  // Retornamos el div con las clases de los estilos aplicados
  // envargadas de aplicar los filtros
  return (
    <div className={filterClasses}></div>
  );
};

export default ColorBlindFilter;