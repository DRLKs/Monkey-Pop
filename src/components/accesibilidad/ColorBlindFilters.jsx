/**
 * Componente que contiene los filtros SVG para simulación de daltonismo
 * 
 * Este componente renderiza filtros SVG ocultos que pueden ser aplicados
 * via CSS usando la propiedad filter: url(#filterId).
 * 
 * Los filtros implementados son:
 * - Protanopia: Deficiencia en la percepción del rojo
 * - Deuteranopia: Deficiencia en la percepción del verde  
 * - Tritanopia: Deficiencia en la percepción del azul
 * - Acromatopsia: Ausencia total de percepción del color
 * 
 * @component
 * @example
 * // Importar y usar en cualquier componente
 * import ColorBlindFilters from './ColorBlindFilters';
 * 
 * return (
 *   <>
 *     <ColorBlindFilters />
 *     <div style={{ filter: 'url(#protanopia)' }}>
 *       Contenido con filtro aplicado
 *     </div>
 *   </>
 * );
 * 
 * @see {@link https://www.w3.org/TR/filter-effects-1/} - Especificación de filtros SVG
 * @see {@link https://daltonlens.org/understanding-cvd/} - Información sobre daltonismo
 */

import React from 'react';

/**
 * Matrices de transformación de color para diferentes tipos de daltonismo
 * 
 * Cada matriz representa cómo se transforman los valores RGB para simular
 * la percepción visual de personas con diferentes tipos de daltonismo.
 * 
 * @constant {Object}
 */
const COLOR_MATRICES = {
  /**
   * Matriz para protanopia (deficiencia de rojo)
   * Simula la dificultad para distinguir rojos y verdes
   */
  protanopia: "0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0",
  
  /**
   * Matriz para deuteranopia (deficiencia de verde)
   * Simula la dificultad para distinguir rojos y verdes (tipo más común)
   */
  deuteranopia: "0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0",
  
  /**
   * Matriz para tritanopia (deficiencia de azul)
   * Simula la dificultad para distinguir azules y amarillos
   */
  tritanopia: "0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0",
  
  /**
   * Matriz para acromatopsia (sin percepción del color)
   * Convierte toda la imagen a escala de grises
   */
  achromatopsia: "0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0, 0, 0, 1, 0"
};

/**
 * Renderiza un filtro SVG individual
 * 
 * @param {string} id - Identificador único del filtro
 * @param {string} matrix - Matriz de transformación de color
 * @param {string} description - Descripción del tipo de daltonismo
 * @returns {JSX.Element} Elemento filter SVG
 */
const renderFilter = (id, matrix, description) => (
  <filter id={id} key={id}>
    <title>{description}</title>
    <feColorMatrix 
      in="SourceGraphic"
      type="matrix" 
      values={matrix}
    />
  </filter>
);

/**
 * Componente principal que contiene todos los filtros de daltonismo
 * 
 * @returns {JSX.Element} SVG con todos los filtros definidos
 */
const ColorBlindFilters = () => {
  return (
    <svg 
      className="color-filters" 
      aria-hidden="true" 
      style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0,
        pointerEvents: 'none'
      }}
    >
      <defs>
        {renderFilter('protanopia', COLOR_MATRICES.protanopia, 'Filtro para protanopia (deficiencia de rojo)')}
        {renderFilter('deuteranopia', COLOR_MATRICES.deuteranopia, 'Filtro para deuteranopia (deficiencia de verde)')}
        {renderFilter('tritanopia', COLOR_MATRICES.tritanopia, 'Filtro para tritanopia (deficiencia de azul)')}
        {renderFilter('achromatopsia', COLOR_MATRICES.achromatopsia, 'Filtro para acromatopsia (sin color)')}
      </defs>
    </svg>
  );
};

export default ColorBlindFilters;

/**
 * Hook personalizado para aplicar filtros de daltonismo
 * 
 * @param {string} filterType - Tipo de filtro a aplicar
 * @returns {Object} Objeto con estilos CSS para aplicar el filtro
 * 
 * @example
 * const MyComponent = () => {
 *   const filterStyles = useColorBlindFilter('protanopia');
 *   return <div style={filterStyles}>Contenido filtrado</div>;
 * };
 */
export const useColorBlindFilter = (filterType) => {
  if (!filterType || filterType === 'normal') {
    return {};
  }
  
  return {
    filter: `url(#${filterType})`
  };
};

/**
 * Constantes con los tipos de filtros disponibles
 * 
 * @constant {Object}
 */
export const COLORBLIND_FILTERS = {
  NORMAL: 'normal',
  PROTANOPIA: 'protanopia',
  DEUTERANOPIA: 'deuteranopia', 
  TRITANOPIA: 'tritanopia',
  ACHROMATOPSIA: 'achromatopsia'
};