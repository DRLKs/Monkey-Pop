// Import the images directly
import monoBasico from '../assets/images/monkeys/monoBasico.webp'
import monoArco from '../assets/images/monkeys/monoArco.png'
import monoFusil from '../assets/images/monkeys/monoFusil.png'
import monoArtificiero from '../assets/images/monkeys/monoArtificiero.png'
import monoFrancotirador from '../assets/images/monkeys/monoFrancotirador.png'
import monoLaser from '../assets/images/monkeys/monoLaser.png'
/**
 * Estados de las casillas del mapa
 * 
 * @typedef {Object} ESTADO_CASILLA
 * @property {string} DEFAULT - Casilla por defecto, verde
 * @property {string} AGUA - Casilla de agua
 * @property {string} CAMINO - Casilla de camino
 */
export const ESTADO_CASILLA = {
    DEFAULT: 'default',
    AGUA: 'agua',
    CAMINO: 'camino'
}

/**
 * Los diferentes tipos de monos existentes
 */
export const MONOS = {
    basico: {
      nombre: "Mono Básico",
      tipo: "basico",
      imagen: monoBasico,
      precio: 100,
      rango: 200,
      tiempoRecarga: 3,
      damage: 1,
      descripcion: "Mono atacante básico con alcance corto"
    },
    arco: {
      nombre: "Mono Arquero",
      tipo: "arco",
      imagen: monoArco,
      precio: 150,
      rango: 100,
      damage: 1,
      tiempoRecarga: 3,
      descripcion: "Mono con arco y alcance medio"
    },
    fusil: {
      nombre: "Mono Fusilero",
      tipo: "fusil",
      imagen: monoFusil,
      precio: 200,
      rango: 150,
      damage: 2,
      tiempoRecarga: 2,
      descripcion: "Mono con fusil y alcance largo"
    },
    artificiero: {
      nombre: "Mono Artificiero",
      tipo: "artificiero",
      imagen: monoArtificiero,
      precio: 200,
      rango: 350,
      damage: 5,
      tiempoRecarga: 5,
      descripcion: "Mono con lanza cohetes"
    },
    francotirador: {
      nombre: "Mono Francotirador",
      tipo: "francotirador",
      imagen: monoFrancotirador,
      precio: 450,
      rango: 800,
      damage: 10,
      tiempoRecarga: 6,
      descripcion: "Mono con rifle de francotirador, grandisimo alcance, poca cadencia de disparo"
    },
    laser: {
      nombre: "Mono Laser",
      tipo: "laser",
      imagen: monoLaser,
      precio: 300,
      rango: 200,
      damage: 2,
      tiempoRecarga: 1,
      descripcion: "Mono con rifle laser, mucha cadencia de disparo"
    },
}

/**
 * Constantes de una partida normal
 */
export const PARTIDA = {
  /**
   * Globos y su vida en cada ronda del juego
   */
  rondas: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,5,4,5,4,5,4,4,4,4,4,4,4,4,4,4],
    [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
    [6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5],
    [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6],
    [9,9,8,8,8,8,8,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
    [10,10,10,10,10,9,9,9,9,9,9,9,9,9,9,9],
    [13,13,13,13,12,12,12,11,10],
    [14,14,14,14,13,13,13,12,11],
    [15,15,15,15,14,14,14,13,12],
    [16,16,16,16,15,15,15,14,13],
    [17,17,17,17,16,16,16],
    [18,18,18,18,17,17,17],
    [19,19,19,19,18,18,18],
    [20,20,20,20,19,19],
    [21,21,21,21],
    [22,22],
    [90,90],
    [500]
  ],
  /**
   * Número de columnas del mapa    Hay que cambiarlo también en el css
   */

  ancho_mapa: 30, 
  /**
   * Número de filas del mapa       Hay que cambiarlo también en el css
   */                
  largo_mapa: 15,    
  
  /**
   * Tiempo de un tick del jeugo en milisegundos
   */
  tiempoActualizacionGlobos: 100,

  /**
   * Tiempo entre rondas en milisegundos
   */
  tiempoEntreRondas: 2500,      

  /**
   * Monedas que da un globo al ser destruido
   */
  monedasGlobo: 10,               
  monedas_iniciales: 170,
  vidas_iniciales: 100,
  ronda_inicial: 1
}

/**
 * Array con las coordenadas de los caminos en el mapa
 */
export const CAMINO_DIAGONAL_MOVIL = [
  // Inicio en la esquina superior izquierda (0,0)
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 3 },
  { x: 7, y: 3 },
  { x: 8, y: 4 },
  { x: 9, y: 4 },
  { x: 10, y: 5 },
  { x: 11, y: 5 },
  { x: 12, y: 6 },
  { x: 13, y: 6 },
  { x: 14, y: 7 },
  { x: 15, y: 7 },
  { x: 16, y: 8 },
  { x: 17, y: 8 },
  { x: 18, y: 9 },
  { x: 19, y: 9 }
  // Termina en la esquina inferior derecha (19,9)
];

export const MAPA_MOVIL = {
  ancho_mapa: 20,
  largo_mapa: 10,
}

export const VALORES_PREDETERMINADOS = {
  volumen: 70,
  efectos: true,
  idioma: 'es'
}

export const MENSAJES = {
  REINICIAR : {
    msg: "¿Seguro que quieres reiniciar la partida?",
    msgAccion: "Reiniciar"
  },
  VOLVER: {
    msg: "¿Seguro que quieres volver al menú principal?",
    msgAccion: "Volver"
  }
}

/**
 * Función que devuelve la información que expondrá la barra de navegación en cada paso del tutorial
 */
export const INFORMACION_TUTORIAL = {
  0: {
    texto: "Bienvenido al tutorial de Monkey Pop"
  },
  1: {
    texto: "Aquí se indican las vidas y las monedas que tienes"
  },
  2: {
    texto: "Las monedas se obtienen al destruir los globos"
  },
  3: {
    texto: "Con las monedas puedes comprar más monos o mejorar los que ya tienes"
  },
  4: {
    texto: "Juega con libertad, coloca los monos donde quieras"
  }

}

export const GLOBO_AMARILLO = '../assets/images/globos/globoAmarillo.webp';
export const GLOBO_ROJO = '../assets/images/globos/globoRojo.webp';
export const GLOBO_VERDE = '../assets/images/globos/globoVerde.webp';
export const GLOBO_MORADO = '../assets/images/globos/globoMorado.webp';