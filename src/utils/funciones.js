// Utilidades
import { PARTIDA, ESTADO_CASILLA } from "./constantes";
import { VALORES_PREDETERMINADOS } from "./constantes";

/**
 * Guarda la configuración de sonido en el localStorage.
 * 
 * @param {*} volumen Nivel de volumen de la música y efectos
 * @param {*} efectos Mutear o no los efectos de sonido y la música
 * @param {*} lenguaje Idioma de la configuración
 * @returns {void}
 */
export const guardarConfiguracion = (volumen, efectos, lenguaje) => {
    const configuracion = {
        volumen,
        efectos,
        lenguaje
    };
    localStorage.setItem('configuracion', JSON.stringify(configuracion));
};

/**
 * Carga en la partida la configuración de sonido desde el localStorage.
 * 
 * @returns {Object} Objeto con la configuración de sonido
 * * @property {number} volumen - Nivel de volumen de la música y efectos
 * * @property {boolean} efectos - Mutear o no los efectos de sonido y la música
 * * @property {string} lenguaje - Idioma de la configuración
 */
export const cargarConfiguracion = () => {
    const configuracionGuardada = localStorage.getItem('configuracion');
    if (configuracionGuardada) {
        return JSON.parse(configuracionGuardada);
    }
    return {
        volumen: VALORES_PREDETERMINADOS.volumen,
        efectos: VALORES_PREDETERMINADOS.efectos,
        lenguaje: VALORES_PREDETERMINADOS.idioma
    };
};

/**
 * Guarda la configuración de la partida en el localStorage.
 * 
 * @param {*} configuracion 
 */
export const guardarConfiguracionPartida = (configuracion) => {
  localStorage.setItem('configuracionPartida', JSON.stringify(configuracion));
}

/**
 * Carga en la partida la configuración desde el localStorage.
 * 
 * @returns 
 * 
 */
export const cargarConfiguracionPartida = () => {
  const configuracion = JSON.parse(localStorage.getItem('configuracionPartida'));
  return configuracion || null;
}


export const obtenerCaminoMapa = (mapa) => {
    const camino = []
    let posicionAnterior;
    let posicionActual;
    
    for (let i = 0; i < mapa.length; i = i + PARTIDA.ancho_mapa) {
        if (mapa[i] === ESTADO_CASILLA.CAMINO) {
        posicionActual = i;
        posicionAnterior = i - 1;
        break;
        }
    }
    
    let caminoTerminado = false;
    let movimiento;
    while( caminoTerminado === false)  { 
        camino.push(posicionActual); 
        movimiento = 0;
        if ((posicionActual + 1) % PARTIDA.ancho_mapa !== 0 && posicionActual + 1 !== posicionAnterior && mapa[posicionActual + 1] === ESTADO_CASILLA.CAMINO) {
           movimiento = 1;
        } else if (posicionActual % PARTIDA.ancho_mapa !== 0 && posicionActual - 1 !== posicionAnterior && mapa[posicionActual - 1] === ESTADO_CASILLA.CAMINO) {
            movimiento = -1;
        } else if (posicionActual < 380 && posicionActual + PARTIDA.ancho_mapa !== posicionAnterior && mapa[posicionActual + PARTIDA.ancho_mapa] === ESTADO_CASILLA.CAMINO) {
            movimiento = PARTIDA.ancho_mapa;
        } else if (posicionActual > PARTIDA.ancho_mapa - 1  && posicionActual - PARTIDA.ancho_mapa !== posicionAnterior && mapa[posicionActual - PARTIDA.ancho_mapa] === ESTADO_CASILLA.CAMINO) {
            movimiento = -PARTIDA.ancho_mapa;
        } else {
            caminoTerminado = true;
        }
        posicionAnterior = posicionActual;
        posicionActual = posicionActual + movimiento;
    }    
    return camino
}



