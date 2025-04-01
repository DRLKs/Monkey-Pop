
import { VALORES_PREDETERMINADOS } from "./constantes";

/**
 * Guarda la configuración de sonido en el localStorage.
 * 
 * @param {*} volumen Nivel de volumen de la música y efectos
 * @param {*} efectos Mutear o no los efectos de sonido y la música
 * @returns {void}
 */
export const guardarConfiguracionSonido = (volumen, efectos) => {
  localStorage.setItem('volumen', volumen);
  localStorage.setItem('efectos', efectos);
}

/**
 * Carga en la partida la configuración de sonido desde el localStorage.
 * 
 * @returns {Object} Objeto con la configuración de sonido
 * * @property {number} volumen - Nivel de volumen de la música y efectos
 * * @property {boolean} efectos - Mutear o no los efectos de sonido y la música
 */
export const cargarConfiguracionSonido = () => {
  // Cargar volumen (valor numérico)
  const volumenGuardado = localStorage.getItem('volumen');
  const volumen = volumenGuardado !== null ? Number(volumenGuardado) : VALORES_PREDETERMINADOS.volumen;
  
  // Cargar efectos (valor booleano)
  const efectosGuardado = localStorage.getItem('efectos');
  const efectos = efectosGuardado !== null ? 
    efectosGuardado === 'true' : 
    VALORES_PREDETERMINADOS.efectos;
  return { volumen, efectos };
}

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






