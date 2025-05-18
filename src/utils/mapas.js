// Arrays de mapas predefinidos para el juego
// Cada mapa es un array de 450 elementos (30x15)
// Valores posibles: 'default' (verde), 'agua', 'camino', 'selected'

import { PARTIDA, MAPA_MOVIL, CAMINO_DIAGONAL_MOVIL } from "./constantes";

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
  if (y > 3 && y - 4 > x) return 'agua';
  if (x > 17 && x > y + 17) return 'agua';

  // Camino diagonal ajustado para 30x15 (igual que mapaCaminoDiagonal)
  if (Math.floor(x * (15/30)) === y || Math.floor(x * (15/30)) === y - 1) return 'camino';

  if((x == 3 && y == 5) || (x == 9 && y == 9) || (x == 19 && y == 13)
    || (x == 17 && y == 6) || (x == 13 && y == 2) || (x == 12 && y == 3)) return 'florAzul';
  if((x == 4 && y == 6) || (x == 11 && y == 2) || (x == 16 && y == 5) || (x == 18 && y == 14) || (x == 10 && y == 10)) return 'florRoja';


  return casilla;
});

/**
 * Para mejorar la jugabilidad en dispositivos móviles, se ajusta el mapa diagonal
 * En este caso el mapa será más pequeño y las casillas serán más grande por lo tanto
 */
export const mapaCaminoDiagonalMovil = Array(MAPA_MOVIL.ancho_mapa * MAPA_MOVIL.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % MAPA_MOVIL.ancho_mapa;
  const y = Math.floor(index / MAPA_MOVIL.ancho_mapa);
  
  // Agua en las esquinas superiores izquierdas e inferiores derechas
  if (y > 3 && y - 2 > x) return 'agua';
  if (x > 15 && x > y + 14) return 'agua';
  
  // Usar el camino definido en CAMINO_DIAGONAL_MOVIL
  for (const punto of CAMINO_DIAGONAL_MOVIL) {
    if (punto.x === x && punto.y === y) return 'camino';
    
    // También hacemos el camino un poco más ancho (1 casilla adicional de ancho)
    if (punto.x === x && punto.y === y - 1) return 'camino';
  }
  
  return casilla;
});

// Mapa con río horizontal y camino vertical
export const mapaRio = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Crear río horizontal (ajustado para nuevas dimensiones)
  if (y === 3) return 'agua';
  if (y === 4) return 'agua';
  if (y === 5) return 'agua';

  if (y === 9) return 'agua';
  if (y === 10) return 'agua';
  if (y === 11) return 'agua';
  
  // Crear camino horizontal
  if (y == 7) return 'camino';
  
  // Puentes sobre el río
  if ((x === 15 && y === 5) || (x === 15 && y === 10)) return 'camino';
  
  return casilla;
});

// Mapa con lago en el centro
export const mapaLago = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);
  
  // Centro del lago
  const centroX = PARTIDA.ancho_mapa / 2;
  const centroY = PARTIDA.largo_mapa / 2;
  
  // Calcula distancia al centro
  const distancia = Math.sqrt(Math.pow(x - centroX, 2) + Math.pow(y - centroY, 2));
  
  // Crear lago circular (ajustado para dimensiones 30x15)
  if (distancia < 6) return 'agua';
  
  // Caminos alrededor del lago
  if (distancia < 8) return 'camino';
  
  // Camino horizontal
  if (y === 4) return 'camino';
    
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
  rio: mapaRio,
  lago: mapaLago,
  isla: mapaIsla,
  archipielago: mapaArchipiélago,
  horizontal: mapaCaminoHorizontal,
  diagonal: mapaCaminoDiagonal,
  diagonalMejorado: mapaCaminoDiagonalMejorado,
  diagonalMovil: mapaCaminoDiagonalMovil
};

export default mapas;