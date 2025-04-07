// Arrays de mapas predefinidos para el juego
// Cada mapa es un array de 450 elementos (30x15)
// Valores posibles: 'default' (verde), 'agua', 'camino', 'selected'

import { PARTIDA } from "./constantes";

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
  diagonal: mapaCaminoDiagonal
};

export default mapas;