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
        volumen: 50,
        efectos: true,
        lenguaje: 'es'
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
  const configuracion = JSON.parse(localStorage.getItem('configuracion'));
  return configuracion || null;
}






