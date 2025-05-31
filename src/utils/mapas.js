// Arrays de mapas predefinidos para el juego
// Cada mapa es un array de 450 elementos (30x15)
// Valores posibles: 'default' (verde), 'agua', 'camino', 'selected'

import { PARTIDA, MAPA_MOVIL, MAPA_CAMINO_DIAGONAL_MOVIL, ESTADO_CASILLA, MAPA_CAMINO_Z_MOVIL, MAPA_CAMINO_ESPIRAL_MOVIL } from "./constantes";


//Mapa con camino diagonal intentando mejorar como se ve. Añadiendo más tipos de casillas
export const mapaCaminoDiagonal = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
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

  if (y > 3 && y - 4 > x) return ESTADO_CASILLA.AGUA;
  if (x > 17 && x > y + 17) return ESTADO_CASILLA.AGUA;

  // Camino diagonal ajustado para 30x15 
  if (Math.floor(x * (15/30)) === y || Math.floor(x * (15/30)) === y - 1) return ESTADO_CASILLA.CAMINO;

  if((x == 3 && y == 5) || (x == 9 && y == 9) || (x == 19 && y == 13)
    || (x == 17 && y == 6) || (x == 13 && y == 2) || (x == 12 && y == 3)) return ESTADO_CASILLA.FLORROSA;
  if((x == 4 && y == 6) || (x == 11 && y == 2) || (x == 16 && y == 5) || (x == 18 && y == 14) || (x == 10 && y == 10)) return ESTADO_CASILLA.FLORROJAYAZUL;


  return casilla;
});

// Mapa tipo Z
export const mapaZOrdenador = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);

  // CAMINO
  if (
    // Nuevo inicio del camino bajando desde (4, 0)
    (x === 4 && y >= 0 && y <= 3) ||
    // Tramo horizontal original 1 desde (4,3) a (29,3)
    (y === 3 && x >= 4 && x <= 22) ||
    // Bajada derecha
    (x === 22 && y >= 3 && y <= 6) ||
    // Tramo horizontal 2
    (y === 6 && x >= 8 && x <= 22) ||
    // Bajada izquierda
    (x === 8 && y >= 6 && y <= 10) ||
    // Tramo horizontal 3
    (y === 10 && x >= 8 && x <= 25) ||
    // Bajada derecha
    (x === 25 && y >= 10 && y <= 13) ||
    // Tramo horizontal 4
    (y === 13 && x >= 10 && x <= 25) ||
    // Bajada final izquierda
    (x === 10 && y >= 13 && y <= 14)
  ) return ESTADO_CASILLA.CAMINO;

  // AGUA (sin tocar el camino)
  if (
    // Esquina inferior izquierda
    (x === 0 && y >= 7 && y <= 14) ||
    (x === 1 && y >= 8 && y <= 14) ||
    (x === 2 && y >= 9 && y <= 14) ||
    (x === 3 && y >= 10 && y <= 14) ||
    (x === 4 && y >= 11 && y <= 14) ||
    (x === 5 && y >= 12 && y <= 14) ||
    (x === 6 && y >= 13 && y <= 14) ||
    (x === 7 && y === 14) ||

    // Esquina superior derecha
    (x === 29 && y >=0 && y <= 6) ||
    (x === 28 && y >= 0 && y <= 5) ||
    (x === 27 && y >= 0 && y <= 4) ||
    (x === 26 && y >= 0 && y <= 3) ||
    (x === 25 && y >= 0 && y <= 2) ||
    (x === 24 && y >= 0 && y <= 1) ||
    (x === 23 && y === 0) 
  ) return ESTADO_CASILLA.AGUA;

  if(
    // La diagonal (0,6) a (8,14)
    (x >= 0 && x <= 8 && y >= 6 && y <= 14 && x === y - 6) 
  ) return ESTADO_CASILLA.AGUA_CESPED1;

  if(
    // La diagonal (22,0) a (29,7)
    (x >= 22 && x <= 29 && y >= 0 && y <= 7 && x === y + 22)
  ) return ESTADO_CASILLA.AGUA_CESPED2;

  // FLORES ROSAS
  if (
    (x === 4 && y === 5) ||
    (x === 14 && y === 8) ||
    (x === 26 && y === 8) ||
    (x === 25 && y === 7) 
  ) return ESTADO_CASILLA.FLORROSA;
  // FLORES ROJAS Y AZULES
  if (
    (x === 3 && y === 6) ||
    (x === 5 && y === 6) ||
    (x === 14 && y === 0) ||
    (x === 13 && y === 1) ||
    (x === 15 && y === 8) 
  ) return ESTADO_CASILLA.FLORROJAYAZUL;

  // CÉSPED por defecto
  return casilla;
});

// Mapa con un camino con figura de espiral
export const mapaCaminoEspiral = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);

  if (
    // Línea recta horizontal
    (y === 7 && x >= 0 && x <= 6) ||
    // Línea recta vertical
    (x === 6 && y >= 4 && y <= 7) ||
    // Esquina en diagonal
    (x === 7 && y === 4) ||
    (x === 7 && y === 3) ||
    (x === 8 && y === 3) ||
    // Línea recta horizontal
    (y === 2 && x >= 8 && x <= 20) ||
    // Esquina en diagonal
    (x === 20 && y === 3) ||
    (x === 21 && y === 3) ||
    (x === 21 && y === 4) ||
    // Línea recta vertical
    (x === 22 && y >= 4 && y <= 10) || 
    // Esquina en diagonal
    (x === 21 && y === 10) ||
    (x === 21 && y === 11) ||
    (x === 20 && y === 11) ||
    // Línea recta horizontal
    (y === 12 && x >= 14 && x <= 20) ||
    // Linea recta vertical
    (x === 13 && y >= 8 && y <= 11) || 
    // Linea recta horizontal
    (y === 7 && x >= 14 && x <= 29) ||
    // Las dos esquinas que quedan
    (x === 14 && y === 11) ||
    (x === 14 && y === 8) 
  ) return ESTADO_CASILLA.CAMINO;

  if (
    (y === 0 && x >= 0 && x <= 2) ||
    (y === 0 && x >= 26 && x <= 29) ||
    (y === 1 && x >= 0 && x <= 1) ||
    (y === 1 && x >= 27 && x <= 29) ||
    (y === 2 && x === 0) ||
    (y === 3 && x === 29) ||
    (y === 2 && x >= 28 && x <= 29) ||
    (y === 11 && x === 0) ||
    (y === 12 && x >= 0 && x <= 1) ||
    (y === 12 && x === 29) ||
    (y === 13 && x >= 0 && x <= 2) ||
    (y === 13 && x >= 28 && x <= 29) ||
    (y === 14 && x >= 0 && x <= 3) ||
    (y === 14 && x >= 27 && x <= 29) 
  ) return ESTADO_CASILLA.AGUA;

  if(
    //Diagonal (0,10) a (4,14)
    (x >= 0 && x <= 4 && y >= 10 && y <= 14 && x === y - 10)
  ) return ESTADO_CASILLA.AGUA_CESPED1;

  if(
    //Diagonal (25,0) a (29, 4)
    (x >= 25 && x <= 29 && y >= 0 && y <= 4 && x === y + 25)
  ) return ESTADO_CASILLA.AGUA_CESPED2;

  if(
    //Diagonal (26,14) a (29,11)
    (x === 26 && y == 14) ||
    (x === 27 && y == 13) ||
    (x === 28 && y == 12) ||
    (x === 29 && y == 11)
  ) return ESTADO_CASILLA.AGUA_CESPED3;

  if(
    //Diagonal (0,3) a (3,0) 
    (x >= 0 && x <= 3 && y >= 0 && y <= 3 && x === 3 - y)
  ) return ESTADO_CASILLA.AGUA_CESPED4;

  // FLORES ROSAS
  if (
    (x === 5 && y === 10) ||
    (x === 6 && y === 11) ||
    (x === 12 && y === 5) ||
    (x === 17 && y === 9) ||
    (x === 26 && y === 4)
  ) return ESTADO_CASILLA.FLORROSA;
  // FLORES ROJAS Y AZULES
  if (
    (x === 7 && y === 10) ||
    (x === 13 && y === 4) ||
    (x === 18 && y === 10) ||
    (x === 25 && y === 3) ||
    (x === 26 && y === 3)
  ) return ESTADO_CASILLA.FLORROJAYAZUL;

  // Césped por defecto
  return casilla;
});

// Otro mapa con un camino que empieza y acaba en el mismo lado del mapa
export const mapaPrincipioFinMismoLado = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);

  if (
    // Línea recta horizontal
    (y === 5 && x >= 0 && x <= 23) ||
    // Línea recta vertical
    (x === 23 && y >= 2 && y <= 5) ||
    // Línea recta horizontal
    (y === 2 && x >= 16 && x <= 23) ||
    // Línea recta vertical
    (x === 16 && y >= 2 && y <= 9) || 
    // Línea recta horizontal
    (y === 9 && x >= 7 && x <= 16) ||
    // Linea recta vertical
    (x === 7 && y >= 9 && y <= 12) || 
    // Linea recta horizontal
    (y === 12 && x >= 0 && x <= 7)
  ) return ESTADO_CASILLA.CAMINO;

if (
    (y === 8 && x >= 22 && x <= 26) ||
    (y === 9 && x >= 21 && x <= 27) ||
    (y === 10 && x >= 20 && x <= 27) ||
    (y === 11 && x >= 20 && x <= 26) ||
    (y === 12 && x >= 21 && x <= 24) 
  ) return ESTADO_CASILLA.AGUA;

  if(
    (x === 27 && y === 8)
  ) return ESTADO_CASILLA.AGUA_CESPED1;

  if(
    (x === 20 && y === 12)
  ) return ESTADO_CASILLA.AGUA_CESPED2;

  if(
    (x === 21 && y === 8) ||
    (x === 20 && y === 9)
  ) return ESTADO_CASILLA.AGUA_CESPED3;

  if(
    (x === 25 && y === 12) ||
    (x === 27 && y === 11)
  ) return ESTADO_CASILLA.AGUA_CESPED4;

// FLORES ROSAS
  if (
    (x === 2 && y === 10) ||
    (x === 2 && y === 8) ||
    (x === 5 && y === 0) ||
    (x === 6 && y === 1) ||
    (x === 13 && y === 12) ||
    (x === 14 && y === 13) ||
    (x === 27 && y === 2) ||
    (x === 27 && y === 7) ||
    (x === 28 && y === 3) 
  ) return ESTADO_CASILLA.FLORROSA;
  // FLORES ROJAS Y AZULES
  if (
    (x === 3 && y === 9) ||
    (x === 6 && y === 2) ||
    (x === 12 && y === 2) ||
    (x === 13 && y === 1) ||
    (x === 28 && y === 2) ||
    (x === 28 && y === 8)
  ) return ESTADO_CASILLA.FLORROJAYAZUL;

  // Césped por defecto
  return casilla;
});

// Mapa con un camino circular
export const mapaCaminoCircular = Array(PARTIDA.ancho_mapa * PARTIDA.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % PARTIDA.ancho_mapa;
  const y = Math.floor(index / PARTIDA.ancho_mapa);

  if (
    // Línea recta horizontal
    (y === 5 && x >= 0 && x <= 6)
  ) return ESTADO_CASILLA.CAMINO;

  // Césped por defecto
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
    return ESTADO_CASILLA.FLORROSA;
  }
  
  else if ( valorCasilla == 6 ){
    return ESTADO_CASILLA.AGUA_CESPED1;
  }

  else if ( valorCasilla === 7 ){
    return ESTADO_CASILLA.AGUA_CESPED2;
  }

  else if ( valorCasilla === 8 ){
    return ESTADO_CASILLA.FLORROJAYAZUL;
  }
  return casilla;
});

export const mapaZMovil = Array(MAPA_MOVIL.ancho_mapa * MAPA_MOVIL.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % MAPA_MOVIL.ancho_mapa;
  const y = Math.floor(index / MAPA_MOVIL.ancho_mapa);

  // Usar la matriz para determinar el tipo de casilla
  const valorCasilla = MAPA_CAMINO_Z_MOVIL[y] && MAPA_CAMINO_Z_MOVIL[y][x];

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
    return ESTADO_CASILLA.FLORROSA;
  }
  
  else if ( valorCasilla == 6 ){
    return ESTADO_CASILLA.AGUA_CESPED1;
  }

  else if ( valorCasilla === 7 ){
    return ESTADO_CASILLA.AGUA_CESPED2;
  }

  else if ( valorCasilla === 8 ){
    return ESTADO_CASILLA.FLORROJAYAZUL;
  }
  
  return casilla;
});

export const mapaEspiralMovil = Array(MAPA_MOVIL.ancho_mapa * MAPA_MOVIL.largo_mapa).fill('default').map((casilla, index) => {
  const x = index % MAPA_MOVIL.ancho_mapa;
  const y = Math.floor(index / MAPA_MOVIL.ancho_mapa);

  // Usar la matriz para determinar el tipo de casilla
  const valorCasilla = MAPA_CAMINO_ESPIRAL_MOVIL[y] && MAPA_CAMINO_ESPIRAL_MOVIL[y][x];

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
    return ESTADO_CASILLA.FLORROSA;
  }
  
  else if ( valorCasilla == 6 ){
    return ESTADO_CASILLA.AGUA_CESPED1;
  }

  else if ( valorCasilla === 7 ){
    return ESTADO_CASILLA.AGUA_CESPED2;
  }

  else if ( valorCasilla === 8 ){
    return ESTADO_CASILLA.FLORROJAYAZUL;
  }
  
  return casilla;
});

/** 
 * Función que devuelve aleatoriamente un mapa para el ordenador
*/
export const mapas_ordenador = () => {
  const mapasDisponiblesOrdenador = [
    mapaCaminoDiagonal,
    mapaZOrdenador,
    mapaCaminoEspiral,
    mapaPrincipioFinMismoLado
  ];

  const indiceAleatorio = Math.floor(Math.random() * mapasDisponiblesOrdenador.length);
  return mapasDisponiblesOrdenador[indiceAleatorio];
};

/**
 * Función que devuelve aleatoriamente un mapa para el movil
 */ 
export const mapas_movil = () => {
  const mapasDisponiblesMovil = [
    mapaCaminoDiagonalMovil,
    mapaZMovil,
    mapaEspiralMovil
  ];
  
  const indiceAleatorio = Math.floor(Math.random() * mapasDisponiblesMovil.length);
  return mapasDisponiblesMovil[indiceAleatorio];
};


