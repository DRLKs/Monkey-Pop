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
  
  return (
    <div className={filterClasses}></div>
  );
};

export default ColorBlindFilter;