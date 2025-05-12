// Utilidades
import { PARTIDA, ESTADO_CASILLA, VALORES_PREDETERMINADOS  } from "./constantes";
import { Globo as GloboClass }   from "./clases";

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




/**
 * Función que guarda en localStorage la capacidad del usuario de jugar.
 * Podrá jugar cuando haya terminado el tutorial.
 */
export const puedeJugar = () => {
    localStorage.setItem("PuedeJugar", true);
};

/**
 * Recupera un valor booleano desde el localStorage.
 * 
 */
export const habilitadoParaJugar = () => {
    
    const valorGuardado = localStorage.getItem("PuedeJugar");
    
    if (valorGuardado === null) {
        return false; // Si no existe el valor, devolver false
    }else{
      return true;    // Si existe el valor, devolver true
    }
    
};

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
        } else if (posicionActual > PARTIDA.ancho_mapa - 1  && posicionActual - PARTIDA.ancho_mapa !== posicionAnterior && mapa[posicionActual - PARTIDA.ancho_mapa] === ESTADO_CASILLA.CAMINO) {
            movimiento = -PARTIDA.ancho_mapa;
        } else if (posicionActual < 420 && posicionActual + PARTIDA.ancho_mapa !== posicionAnterior && mapa[posicionActual + PARTIDA.ancho_mapa] === ESTADO_CASILLA.CAMINO) {
            movimiento = PARTIDA.ancho_mapa;
        } else if (posicionActual % PARTIDA.ancho_mapa !== 0 && posicionActual - 1 !== posicionAnterior && mapa[posicionActual - 1] === ESTADO_CASILLA.CAMINO) {
            movimiento = -1;
        } else {
            caminoTerminado = true;
        }
        posicionAnterior = posicionActual;
        posicionActual = posicionActual + movimiento;
    }    
    return camino
}


/**
 * Reducer para manejar el estado del juego en el tutorial
 * @param {Object} state - Estado actual del juego
 * @param {Array} state.globos - Lista de globos en el juego
 * @param {Array} state.monosColocados - Lista de monos colocados en el mapa
 * @param {number} state.indexGlobo - Índice del globo actual
 * @param {number} state.vidas - Vidas restantes del jugador
 * @param {number} state.monedas - Monedas del jugador
 * @param {number} state.ronda - Ronda actual del juego
 * @param {boolean} state.perdido - Indica si el jugador ha perdido
 * @param {Object} action - Acción a realizar en el juego
 * @param {string} action.type - Tipo de acción a realizar
 * @returns {Object} Nuevo estado del juego
 */
export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'TICK':
      const globosTablero = [...state.globos];      
      const monos = state.monosColocados;

      const globosAEliminar = [];
      const indexGlobosExplotados = []

      // Actualizamos la posición de los globos existentes
      let vidasPerdidas = 0;
      globosTablero.forEach((globo) => {
        globo.addTiempoDeVida();
        const tiempoDeVida = globo.getTiempoDeVida();
        
        if (tiempoDeVida >= action.camino.length) {
          globosAEliminar.push(globo.id);
          vidasPerdidas += globo.getHealth();
        } else {
          globo.setPosition(action.camino[tiempoDeVida]);
        }
      });

      // Actualizamos los monos existentes
      let sumaMonedas = 0;
      let sumaGlobosExplotados = 0;
      monos.forEach(mono => {
        if( mono.puedeAtacar() ){
          const globosExistentes = globosTablero.filter(globo => globosAEliminar.some( g => g === globo.id) === false);
          const globoAtacado = mono.attack(globosExistentes);
          if ( globoAtacado !== null) {
            //console.log('Mono atacando a globo:', globoAtacado.id, globoAtacado.health,mono.damage);

            if ( globoAtacado.health <= mono.damage ){  // El globo explota
              sumaMonedas += PARTIDA.monedasGlobo;
              ++sumaGlobosExplotados;
              globosAEliminar.push(globoAtacado.id);
              indexGlobosExplotados.push(globoAtacado.index);
            }else{                                    // El globo pierde vida
              for (let i = 0; i < globosTablero.length; i++) {
                if (globosTablero[i].id == globoAtacado.id) {
                  globosTablero[i].health -= mono.damage;
                  break;
                }
              }
            }
          }
        }
      });

      // Se eliminan los globos que han sido destruidos
      globosAEliminar.forEach(globoEliminar => {
        globosTablero.forEach((globo, index) => {
          if (globo.id === globoEliminar) {
            globosTablero.splice(index, 1);
          }
        });
      });


      if (vidasPerdidas >= state.vidas) {
        return { ...state,  vidas: 0, perdido: true };  
      }
      
      // Los globos que quedan de la ronde se introducen en el juego
      if (state.indexGlobo < PARTIDA.rondas[state.ronda-1].length) {
        const health = PARTIDA.rondas[state.ronda-1][state.indexGlobo];
        const globo = new GloboClass(state.indexGlobo, action.camino[0], health, 0);
        globosTablero.push(globo);
      }else{
        // Si no quedan globos de la ronda, se pasa a la siguiente ronda
        if (globosTablero.length === 0) {
          return { ...state, vidas: state.vidas - vidasPerdidas, globos: globosTablero, indexsGlobosExplotados: [], indexGlobo: 0, ronda: state.ronda + 1, nuevaRonda: true };
        }
      }

      return {
        ...state,
        globos: globosTablero,
        indexGlobo: state.indexGlobo + 1,
        vidas: state.vidas - vidasPerdidas,
        monedas: state.monedas + sumaMonedas,
        globosExplotados: state.globosExplotados + sumaGlobosExplotados,
        nuevaRonda: false,
        indexsGlobosExplotados: indexGlobosExplotados
      };
      
    case 'REINICIAR':
      return action.estadoInicial;

    case 'AGREGAR_MONO':
      return {
        ...state,
        monosColocados: [...state.monosColocados, action.mono],
        monedas: state.monedas - action.precio,
      };
    
    case 'VENDER_MONO':
      const nuevosMonos = state.monosColocados.filter(mono => mono.id !== action.id);
      return {
        ...state,
        monosColocados: nuevosMonos,
        monedas: state.monedas + action.precio
      };

    case 'MEJORAR_MONO':
      return {
        ...state,
        monedas: state.monedas - action.precio
      };
      
    default:
      return state;
  }
};

