// Import the images directly
import monoBasico from '../assets/images/monkeys/monoBasico.png'
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

export const PARTIDA = {
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
    [90,90]
  ],
  ancho_mapa: 30,   // Tienes que cambiar el css también en juegocss
  largo_mapa: 15,
  tiempoActualizacionGlobos: 100, // Tiempo en milisegundos
  tiempoEntreRondas: 5000, // Tiempo en milisegundos
  monedasGlobo: 10, // Cantidad de monedas que da un globo al ser destruido
  monedas_iniciales: 170,
  vidas_iniciales: 100,
  ronda_inicial: 1
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

export const GLOBO_AMARILLO = '../assets/images/globos/globoAmarillo.webp';
export const GLOBO_ROJO = '../assets/images/globos/globoRojo.webp';
export const GLOBO_VERDE = '../assets/images/globos/globoVerde.webp';
export const GLOBO_MORADO = '../assets/images/globos/globoMorado.webp';