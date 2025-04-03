
// Import the images directly
import monoBasico from '../assets/images/monkeys/monoBasico.png'
import monoArco from '../assets/images/monkeys/monoArco.png'
import monoFusil from '../assets/images/monkeys/monoFusil.png'

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
    }
}

export const PARTIDA = {
  rondas: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,5,4,5,4,5,4,4,4,4,4,4,4,4,4,4]
  ],
  ancho_mapa: 30,   // Tienes que cambiar el css también en juegocss
  largo_mapa: 15,
  tiempoActualizacionGlobos: 100, // Tiempo en milisegundos
  tiempoEntreRondas: 5000, // Tiempo en milisegundos
  monedasGlobo: 10 // Cantidad de monedas que da un globo al ser destruido
}

export const VALORES_PREDETERMINADOS = {
  volumen: 70,
  efectos: true,
  idioma: 'es'
}