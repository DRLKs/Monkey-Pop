// Arrays de mapas predefinidos para el juego
// Cada mapa es un array de 450 elementos (30x15)
// Valores posibles: 'default' (verde), 'agua', 'camino', 'selected'

import { PARTIDA, MAPA_MOVIL, MAPA_CAMINO_DIAGONAL_MOVIL, ESTADO_CASILLA } from "./constantes";

// Mapa con camino horizontal y agua en los bordes superior e inferior
export const mapaCaminoHorizontal = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Agua en los bordes superior e inferior
  if (y < 2 || y > 12) return 'agua';
  
  // Camino horizontal simple
  if (y === 7) return 'camino';
  
  return casilla;
});

// Mapa con camino diagonal y agua en las esquinas
export const mapaCaminoDiagonal = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Agua en las esquinas
  if ( y > 3 && y - 4 > x ) return 'agua'
  if ( x > 17 && x > y + 17 ) return 'agua'
  
  // Camino diagonal ajustado para 30x15
  if (Math.floor(x * (15/30)) === y || Math.floor(x * (15/30)) === y - 1) return 'camino';
  
  return casilla;
});

//Mapa con camino diagonal intentando mejorar como se ve. Añadiendo más tipos de casillas
export const mapaCaminoDiagonalMejorado = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);

  // Diagonal (0,4) a (10,14) Agua-Cesped1
  if (x >= 0 && x <= 10 && y >= 4 && y <= 14 && x === y - 4) return 'agua_cesped1';

  // Diagonal (17,0) a (29,12) Agua-Cesped2
  if (x >= 17 && x <= 29 && y >= 0 && y <= 12 && x === y + 17) return 'agua_cesped2';

  // Diagonal (2,0) a (28,13) Tierra-Cesped1 (2x, 1y)
  // (x, y) = (2 + 2*n, 0 + n) para n = 0..13
  if (x >= 2 && x <= 28 && y >= 0 && y <= 13 && (x - 2) % 2 === 0 && (x - 2) / 2 === y) return 'tierra_cesped1';

  // Diagonal (1,2) a (25,14) Tierra-Cesped2 (2x, 1y)
  // (x, y) = (1 + 2*n, 2 + n) para n = 0..12
  if (x >= 1 && x <= 25 && y >= 2 && y <= 14 && (x - 1) % 2 === 0 && (x - 1) / 2 === y - 2) return 'tierra_cesped2';

  // Agua en las esquinas (igual que mapaCaminoDiagonal)
  if (y > 3 && y - 4 > x) return ESTADO_CASILLA.AGUA;
  if (x > 17 && x > y + 17) return ESTADO_CASILLA.AGUA;

  // Camino diagonal ajustado para 30x15 (igual que mapaCaminoDiagonal)
  if (Math.floor(x * (15/30)) === y || Math.floor(x * (15/30)) === y - 1) return ESTADO_CASILLA.CAMINO;

  if((x == 3 && y == 5) || (x == 9 && y == 9) || (x == 19 && y == 13)
    || (x == 17 && y == 6) || (x == 13 && y == 2) || (x == 12 && y == 3)) return ESTADO_CASILLA.FLORAZUL;
  if((x == 4 && y == 6) || (x == 11 && y == 2) || (x == 16 && y == 5) || (x == 18 && y == 14) || (x == 10 && y == 10)) return ESTADO_CASILLA.FLORROJA;


  return casilla;
});

/**
 * Para mejorar la jugabilidad en dispositivos móviles, se ajusta el mapa diagonal
 * con casillas de transición para mayor integridad visual
 */
export const mapaCaminoDiagonalMovil = Array(MAPA_MOVIL.ancho_mapa * MAPA_MOVIL.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % MAPA_MOVIL.ancho_mapa;
  const y = Math.floor(index / MAPA_MOVIL.ancho_mapa);
  
  // Usar la matriz para determinar el tipo de casilla
  // Estás usando MAPA_CAMINO_DIAGONAL_MOVIL que sí es una matriz bidimensional
  const valorCasilla = MAPA_CAMINO_DIAGONAL_MOVIL[y] && MAPA_CAMINO_DIAGONAL_MOVIL[y][x];
  
  // Si es cesped, default (0), no se hace nada
  if( valorCasilla === 0 ){

  }

  // Si es camino (1), devuelve camino
  else if (valorCasilla === 1) {
    return ESTADO_CASILLA.CAMINO;
  }
  
  // Si es agua (2), devuelve agua
  else if (valorCasilla === 2) {
    return ESTADO_CASILLA.AGUA;
  }

  else if (valorCasilla === 3) {
    return ESTADO_CASILLA.TIERRA_CESPED2;
  }

  else if (valorCasilla === 4){
    return ESTADO_CASILLA.TIERRA_CESPED1;
  }

  else if ( valorCasilla === 5){
    return ESTADO_CASILLA.FLORAZUL;
  }
  
  else if ( valorCasilla == 6 ){
    return ESTADO_CASILLA.AGUA_CESPED1;
  }

  else if ( valorCasilla === 7 ){
    return ESTADO_CASILLA.AGUA_CESPED2;
  }

  else if ( valorCasilla === 8 ){
    return ESTADO_CASILLA.FLORROJA;
  }
  return casilla;
});

// Mapa tipo isla con agua en los bordes
export const mapaIsla = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Agua en los bordes
  if (x < 3 || x > PARTIDA.ancho_mapa - 4 || y < 2 || y > PARTIDA.largo_mapa - 3) return 'agua';
  
  // Caminos horizontales
  if ((y === 4 || y === PARTIDA.largo_mapa - 5) && x >= 3 && x <= PARTIDA.ancho_mapa - 4) return 'camino';
  
  // Caminos verticales
  if ((x === 8 || x === PARTIDA.ancho_mapa - 9) && y >= 2 && y <= PARTIDA.largo_mapa - 3) return 'camino';
  
  return casilla;
});

// Mapa con varias islas pequeñas
export const mapaArchipiélago = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('agua').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Crear 5 islas pequeñas (posiciones ajustadas para 30x15)
  const islas = [
    { centroX: 7, centroY: 4, radio: 2 },
    { centroX: 22, centroY: 4, radio: 2 },
    { centroX: 15, centroY: 7, radio: 3 },
    { centroX: 7, centroY: 11, radio: 2 },
    { centroX: 22, centroY: 11, radio: 2 }
  ];
  
  // Verificar si el punto está en alguna isla
  for (const isla of islas) {
    const distancia = Math.sqrt(Math.pow(x - isla.centroX, 2) + Math.pow(y - isla.centroY, 2));
    if (distancia <= isla.radio) return 'default';
    if (distancia > isla.radio && distancia <= isla.radio + 0.5) return 'camino';
  }

  return casilla;
});

// Exportar todos los mapas en un objeto para fácil acceso
export const mapas = {
  isla: mapaIsla,
  archipielago: mapaArchipiélago,
  horizontal: mapaCaminoHorizontal,
  diagonal: mapaCaminoDiagonal,
  diagonalMejorado: mapaCaminoDiagonalMejorado,
  diagonalMovil: mapaCaminoDiagonalMovil
};

export default mapas;