// Bibliotecas de React
import React, { useMemo, useReducer, useState, useEffect, act } from 'react'

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion'
import { CasillaMapa } from '../components/CasillaMapa'
import { BarraMonos } from '../components/BarraMonos'
import { MonoBarraNavegador } from '../components/MonoBarraNavegador'
import MonoAgarrado from '../components/MonoAgarrado'
import FinJuego from '../components/FinJuego'
import AjustesContainerJuego from '../components/AjustesContainerJuego'

// Clases
import { Globo as GloboClass, Mono as MonoClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes'

// Imágenes de los botonos
import btnAjustes from '../assets/images/botones/btn-ajustes.png'
import btnReiniciar from '../assets/images/botones/btn-reiniciar.png'

// Estilos
import '../styles/juego.css'

// Constantes del juego
const MONEDAS_INICIALES = 170;
const VIDAS_INICIALES = 150;
const RONDA_INICIAL = 1;

/**
 * 
 * @param {*} state Información del estado del juego
 * @param {GloboClass[]} state.globos Lista de globos en el juego
 * @param {number} state.indexGlobo Índice del globo actual
 * @param {number} state.vidas Vidas restantes del jugador
 * @param {number} state.monedas Monedas del jugador
 * @param {number} state.ronda Ronda actual del juego
 * @param {boolean} state.perdido Indica si el jugador ha perdido
 * @param {boolean} state.needsUIUpdate Indica si se necesita actualizar la UI
 * 
 * @param {*} action Acción a realizar en el juego
 * @param {string} action.type Tipo de acción a realizar 
 * @returns 
 */
function gameReducer(state, action) {
  switch (action.type) {
    case 'TICK':
      const globosActualizados = [...state.globos];
      const globosAEliminar = [];
      
      const monos = state.monosColocados;

      // Actualizamos los globos existentes
      let vidasPerdidas = 0;
      globosActualizados.forEach((globo) => {
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
      monos.forEach(mono => {
        if( mono.puedeAtacar() ){
          const globosExistentes = globosActualizados.filter(globo => globosAEliminar.some( g => g === globo.id) === false);
          const globoAtaca = mono.attack(globosExistentes);
          if ( globoAtaca !== null) {
            console.log('Mono atacando...', globoAtaca.id);

            if ( globoAtaca.health <= mono.damage ){  // El globo explota
              sumaMonedas += PARTIDA.monedasGlobo;
              globosAEliminar.push(globoAtaca.id);
            }else{                                    // El globo pierde vida
              for (let i = 0; i < globosActualizados.length; i++) {
                if (globosActualizados[i].id === globoAtaca.id) {
                  globosActualizados[i].health -= mono.damage;
                  break;
                }
              }
            }
          }
        }
      });

      // Se eliminan los globos que han sido destruidos
      globosAEliminar.forEach(globoEliminar => {
        globosActualizados.forEach((globo, index) => {
          if (globo.id === globoEliminar) {
            globosActualizados.splice(index, 1);
          }
        });
      });


      if (vidasPerdidas >= state.vidas) {
        return { ...state, vidas: 0, perdido: true };  
      }
      
      // Los globos que quedan de la ronde se introducen en el juego
      if (state.indexGlobo < PARTIDA.rondas[state.ronda-1].length) {
        const health = PARTIDA.rondas[state.ronda-1][state.indexGlobo];
        const globo = new GloboClass(state.indexGlobo, action.camino[0], health, 0);
        globosActualizados.push(globo);
      }else{
        // Si no quedan globos de la ronda, se pasa a la siguiente ronda
        if (globosActualizados.length === 0) {
          return { ...state, indexGlobo: 0, ronda: state.ronda + 1 };
        }
      }

      return {
        ...state,
        globos: globosActualizados,
        needsUIUpdate: true,
        indexGlobo: state.indexGlobo + 1,
        vidas: state.vidas - vidasPerdidas,
        monedas: state.monedas + sumaMonedas,
      };
      
    case 'REINICIAR':
      return action.estadoInicial;

    case 'AGREGAR_MONO':
      return {
        ...state,
        monosColocados: [...state.monosColocados, action.mono],
        monedas: state.monedas - action.precio,
      };
    default:
      return state;
  }
}

function Juego() {
  const [mapa, setMapa] = useState(mapas.horizontal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoFin, setTiempoFin] = useState(null);
  const [globosExplotados, setGlobosExplotados] = useState(0);
  const [ajustesVisible, setAjustesVisible] = useState(false);
  
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],
    monosColocados: [],
    indexGlobo: 0,
    vidas: VIDAS_INICIALES,
    monedas: MONEDAS_INICIALES,
    ronda: RONDA_INICIAL,
    perdido: false,
    needsUIUpdate: false
  });

  const camino = useMemo(() => {
    const caminos = [];
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
      caminos.push(posicionActual); 
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
    return caminos;
  }, []);

  useEffect(() => {
    if (gameState.needsUIUpdate) {
      // Update visual states from gameState
    }
  }, [gameState.needsUIUpdate]);

  /*
   * Controla el tiempo de juego para calcular el tiempo jugado en la pantalla final 
   */
  useEffect(() => {
    if (gameState.perdido && tiempoFin === null) {
      setTiempoFin(Date.now());
    }
  }, [gameState.perdido, tiempoFin]);


  /*
   * Controla el bucle del juego
   * Actualiza el estado de los globos cada: 1 segundo
   */
  useEffect(() => {
    let lastUpdateTime = 0;
    let animationFrameId;

    const gameLoop = (timestamp) => {
      if (!lastUpdateTime) lastUpdateTime = timestamp;
      
      const elapsed = timestamp - lastUpdateTime;
      
      // Actualiza el estado de los globos cada 1 segundo
      if (elapsed >= PARTIDA.tiempoActualizacionGlobos) {

        if (!gameState.perdido) {
          dispatch({
            type: 'TICK',
            camino: camino,
          });
        }


        lastUpdateTime = timestamp;
      }
      
      // Continuamos el loop de animación
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    // Iniciamos el loop de animación
    animationFrameId = requestAnimationFrame(gameLoop);
    
    // Limpieza al desmontar
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camino, gameState.perdido]);

  const actualizarMapa = (index) => {
    const estadoCasillaMarcada = mapa[index];
    if (estadoCasillaMarcada === ESTADO_CASILLA.AGUA || mapa[index] === ESTADO_CASILLA.CAMINO ) return;
    const newMapa = [...mapa];

    if (monoSeleccionado !== null) {
      const nuevoMono = new MonoClass(gameState.monosColocados.length,  // Si existe la posibilidad de quitar monos, esto dará error
                                      monoSeleccionado,
                                      index,
                                      MONOS[monoSeleccionado].rango, 
                                      MONOS[monoSeleccionado].damage,
                                      MONOS[monoSeleccionado].tiempoRecarga);
      dispatch({
        type: 'AGREGAR_MONO',
        mono: nuevoMono,
        precio: MONOS[monoSeleccionado].precio
      });
      setMonoSeleccionado(null);
    }

    setMapa(newMapa);
  }

  /*
   * Controla el movimiento del ratón para que la imagen del mono siga al ratón
   */
  useEffect(() => {
    const controladorMovimientoRaton = (event) => {
      setPosition({x: event.clientX, y: event.clientY});
    }
    
    if (monoSeleccionado !== null) {
      window.addEventListener('pointermove', controladorMovimientoRaton);
    }
    
    return () => {
      window.removeEventListener('pointermove', controladorMovimientoRaton);
    }
  }, [monoSeleccionado]);

  /**
   * Función que controla el manejo de los monos seleccionados
   */
  const agarrarMono = (tipoMono) => {
    if (monoSeleccionado === tipoMono) {
      setMonoSeleccionado(null);
    } else {
      setMonoSeleccionado(tipoMono);
    }
  }

  /**
   * Función que se ejecutará para reiniciar los estados y comenzar una nueva partida 
   */
  const reiniciarJuego = () => {
    setTiempoInicio(Date.now());
    setTiempoFin(null);
    setGlobosExplotados(0);
    dispatch({
      type: 'REINICIAR',
      estadoInicial: {
        globos: [],
        monosColocados: [],
        indexGlobo: 0,
        vidas: VIDAS_INICIALES,
        monedas: MONEDAS_INICIALES,
        ronda: RONDA_INICIAL,
        perdido: false,
        needsUIUpdate: false
      }
    });
  };

  /**
   * Función que se ejecuta al hacer click en el botón de ajustes
   */
  const abrirAjustes = () => {
    setAjustesVisible(!ajustesVisible);
  }

  return (
    <>
      <BarraNavegacion>
        <div className='botones-container'>
          <div className="ajustes">
            <img 
              src={btnAjustes} 
              alt="Ajustes" 
              className="icono-boton" 
              onClick={abrirAjustes} 
            />
          </div>
          <div className="reiniciar">
            <img 
              src={btnReiniciar} 
              alt="Reiniciar" 
              className="icono-boton" 
              onClick={reiniciarJuego} 
            />
            </div>
        </div>
       

        <div className="info-ronda">
          <h2>Ronda: {gameState.ronda}</h2>
        </div>

        <BarraMonos
          monedas={gameState.monedas}
          vidas={gameState.vidas}
          >
          { /* Arrglar esto para no poner todos los monos manualmente */ }
          <MonoBarraNavegador
            tipo={MONOS.basico.tipo}
            agarrarMono={() => agarrarMono(MONOS.basico.tipo)}
            sePuedeComprar={gameState.monedas >= MONOS.basico.precio}
            />
          <MonoBarraNavegador
            tipo={MONOS.arco.tipo}
            agarrarMono={() => agarrarMono(MONOS.arco.tipo)}
            sePuedeComprar={gameState.monedas >= MONOS.arco.precio}
            />
          <MonoBarraNavegador
            tipo={MONOS.fusil.tipo}
            agarrarMono={() => agarrarMono(MONOS.fusil.tipo)}
            sePuedeComprar={gameState.monedas >= MONOS.fusil.precio}
            />


        </BarraMonos>
      </BarraNavegacion>

      {monoSeleccionado !== null && (
        <MonoAgarrado
          x={position.x}
          y={position.y}
          tipoMono={[monoSeleccionado]}
        />
        )}

      <div className="game-container">
        {mapa.map((estado, index) => {
          const globosEnCasilla = gameState.globos.filter(globo => globo.index === index);
          const monosEnCasilla = gameState.monosColocados.filter(mono => mono.index === index);

          return (
            <CasillaMapa 
              key={index} 
              estado={estado}
              index={index}
              actualizarMapa={() => actualizarMapa(index)}
              globos={globosEnCasilla} 
              monos={monosEnCasilla}
              />
          )
        })}
      </div>

      <AjustesContainerJuego 
        visible={ajustesVisible} 
        onClose={() => setAjustesVisible(false)} 
      />

      <FinJuego 
        visible={gameState.perdido} 
        estadisticas={{
          ronda: gameState.ronda,
          monedas: gameState.monedas - MONEDAS_INICIALES,
          tiempoJugado: Math.floor(((tiempoFin || Date.now()) - tiempoInicio) / 1000),
          globosExplotados: globosExplotados
        }}
        onReiniciar={reiniciarJuego}
      />
    </>
  )
}

export default Juego