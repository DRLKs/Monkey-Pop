// Arrays de mapas predefinidos para el juego
// Cada mapa es un array de 400 elementos (20x20)
// Valores posibles: 'default' (verde), 'agua', 'camino', 'selected'

// Mapa con camino horizontal y agua en los bordes superior e inferior
export const mapaCaminoHorizontal = Array(400).fill('default').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Agua en los bordes superior e inferior
  if (y < 3 || y > 16) return 'agua';
  
  // Camino horizontal simple
  if (y === 10) return 'camino';
  
  return casilla;
});

// Mapa con camino diagonal y agua en las esquinas
export const mapaCaminoDiagonal = Array(400).fill('default').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Agua en las esquinas
  if ((x > 14 && y < 5) || (x < 5 && y > 14) ) return 'agua';
  
  // Camino diagonal
  if ((x === y) || (x === y - 1)) return 'camino';
  
  return casilla;
});

// Mapa con río horizontal y camino vertical
export const mapaRio = Array(400).fill('default').map((casilla, index) => {
  // Crear río horizontal
  if (index >= 140 && index < 160) return 'agua';
  if (index >= 240 && index < 260) return 'agua';
  
  // Crear camino vertical
  if (index % 20 === 7 && !(index >= 140 && index < 160) && !(index >= 240 && index < 260)) return 'camino';
  
  // Puentes sobre el río
  if ((index === 147) || (index === 247)) return 'camino';
  
  return casilla;
});

// Mapa con lago en el centro
export const mapaLago = Array(400).fill('default').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Centro del lago
  const centroX = 10;
  const centroY = 10;
  
  // Calcula distancia al centro
  const distancia = Math.sqrt(Math.pow(x - centroX, 2) + Math.pow(y - centroY, 2));
  
  // Crear lago circular
  if (distancia < 5) return 'agua';
  
  // Caminos alrededor del lago
  if (distancia >= 5 && distancia < 6) return 'camino';
  
  // Camino horizontal
  if (y === 5 && x > 2 && x < 18) return 'camino';
  
  // Camino vertical
  if (x === 5 && y > 2 && y < 18) return 'camino';
  
  return casilla;
});

// Mapa tipo isla con agua en los bordes
export const mapaIsla = Array(400).fill('default').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Agua en los bordes
  if (x < 2 || x > 17 || y < 2 || y > 17) return 'agua';
  
  // Caminos horizontales
  if ((y === 5 || y === 15) && x >= 2 && x <= 17) return 'camino';
  
  // Caminos verticales
  if ((x === 5 || x === 15) && y >= 2 && y <= 17) return 'camino';
  
  return casilla;
});

// Mapa tipo laberinto
export const mapaLaberinto = Array(400).fill('default').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Paredes del laberinto (usando agua para visualizarlas)
  if ((x % 4 === 0 || y % 4 === 0) && 
      !(x % 4 === 0 && y % 4 === 0) && 
      x > 0 && x < 19 && y > 0 && y < 19) return 'agua';
  
  // Caminos del laberinto
  if ((x % 2 === 1 && y % 2 === 1) || 
      (x === 10 && y >= 5 && y <= 15) || 
      (y === 10 && x >= 5 && x <= 15)) return 'camino';
  
  return casilla;
});

// Mapa con varias islas pequeñas
export const mapaArchipiélago = Array(400).fill('agua').map((casilla, index) => {
  const x = index % 20;
  const y = Math.floor(index / 20);
  
  // Crear 5 islas pequeñas
  const islas = [
    { centroX: 5, centroY: 5, radio: 2 },
    { centroX: 15, centroY: 5, radio: 2 },
    { centroX: 10, centroY: 10, radio: 3 },
    { centroX: 5, centroY: 15, radio: 2 },
    { centroX: 15, centroY: 15, radio: 2 }
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
  laberinto: mapaLaberinto,
  archipielago: mapaArchipiélago,
  horizontal: mapaCaminoHorizontal,
  diagonal: mapaCaminoDiagonal
};

export default mapas;