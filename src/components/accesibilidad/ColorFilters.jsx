import React from 'react';

/**
 * Componente que renderiza los filtros SVG para simular diferentes tipos de daltonismo
 * Estos filtros se aplican a nivel global mediante CSS
 */
const ColorFilters = () => {
  return (
    <svg 
      aria-hidden="true"
      style={{ 
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden'
      }}
    >
      <defs>
        {/* Filtro para protanopia (dificultad para ver rojo) */}
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
        
        {/* Filtro para deuteranopia (dificultad para ver verde) */}
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
        
        {/* Filtro para tritanopia (dificultad para ver azul) */}
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
        
        {/* Filtro para acromatopsia (sin percepción del color) */}
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
  );
};

export default ColorFilters;