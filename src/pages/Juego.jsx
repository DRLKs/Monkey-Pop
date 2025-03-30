// Bibliotecas de React
import React, { useMemo, useReducer, useState, useEffect } from 'react'

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion'
import { CasillaMapa } from '../components/CasillaMapa'
import { BarraMonos } from '../components/BarraMonos'
import { Mono } from '../components/Mono'
import MonoAgarrado from '../components/MonoAgarrado'
import FinJuego from '../components/FinJuego'

// Clases
import { Globo as GloboClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes'

// Estilos
import '../styles/juego.css'

// Constantes del juego
const MONEDAS_INICIALES = 170;
const VIDAS_INICIALES = 1;
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
      
      // Actualizamos los globos existentes
      globosActualizados.forEach((globo, index) => {
        globo.addTiempoDeVida();
        const tiempoDeVida = globo.getTiempoDeVida();
        
        if (tiempoDeVida >= action.camino.length) {
          globosAEliminar.push(index);
        } else {
          globo.setPosition(action.camino[tiempoDeVida]);
        }
      });
      
      // Eliminamos los globos que han llegado al final del camino
      // y calculamos las vidas perdidas
      let vidasPerdidas = 0;
      for (let i = globosAEliminar.length - 1; i >= 0; i--) {
        vidasPerdidas += globosActualizados[globosAEliminar[i]].getHealth();
        globosActualizados.splice(globosAEliminar[i], 1);
      }

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
        needsUIUpdate: globosAEliminar.length > 0,
        needsUIUpdate: true,
        indexGlobo: state.indexGlobo + 1,
        vidas: state.vidas - vidasPerdidas,

      };
      
    case 'REINICIAR':
      return action.estadoInicial;

    default:
      return state;
  }
}

function Juego() {
  const [mapa, setMapa] = useState(mapas.diagonal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [casillaSeleccionada, setCasillaSeleccionada] = useState(null);
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoFin, setTiempoFin] = useState(null);
  const [globosExplotados, setGlobosExplotados] = useState(0);
  
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],
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

    for (let i = 0; i < mapa.length; i = i + 20) {
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
      if ( posicionActual + 1 % 20 !== 0 && posicionActual + 1 !== posicionAnterior && mapa[posicionActual + 1] === ESTADO_CASILLA.CAMINO) {
        movimiento = 1;
      } else if (posicionActual % 20 !== 0 && posicionActual - 1 !== posicionAnterior && mapa[posicionActual - 1] === ESTADO_CASILLA.CAMINO) {
        movimiento = -1;
      } else if (posicionActual < 380 && posicionActual + 20 !== posicionAnterior && mapa[posicionActual + 20] === ESTADO_CASILLA.CAMINO) {
        movimiento = 20;
      } else if (posicionActual > 19  && posicionActual - 20 !== posicionAnterior && mapa[posicionActual - 20] === ESTADO_CASILLA.CAMINO) {
        movimiento = -20;
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

  useEffect(() => {
    if (gameState.perdido && tiempoFin === null) {
      setTiempoFin(Date.now());
    }
  }, [gameState.perdido, tiempoFin]);

  useEffect(() => {
    /**
     * Función que se ejecuta cada segundo para actualizar que el juego mantenga un flujo constante
     */
    const gameLoop = setInterval(() => {
      if (gameState.perdido) return;
      
      dispatch({ 
        type: 'TICK', 
        camino: camino 
      });
    }, 1000);
    
    return () => clearInterval(gameLoop);
  }, []);

  const actualizarMapa = (index) => {
    const estadoCasillaMarcada = mapa[index];
    if (estadoCasillaMarcada === ESTADO_CASILLA.AGUA || mapa[index] === ESTADO_CASILLA.CAMINO ) return;
    const newMapa = [...mapa];
    if (estadoCasillaMarcada === ESTADO_CASILLA.SELECTED) {       
      setCasillaSeleccionada(null);
    } else {
      newMapa[index] = ESTADO_CASILLA.SELECTED;
      setCasillaSeleccionada(index);
    }

    if (casillaSeleccionada !== null) {
      newMapa[casillaSeleccionada] = ESTADO_CASILLA.DEFAULT;
    }

    setMapa(newMapa);
  }

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

  const agarrarMono = (tipoMono) => {
    if (monoSeleccionado === tipoMono) {
      setMonoSeleccionado(null);
    } else {
      setMonoSeleccionado(tipoMono);
    }
  }

  const reiniciarJuego = () => {
    setTiempoInicio(Date.now());
    setTiempoFin(null);
    setGlobosExplotados(0);
    dispatch({
      type: 'REINICIAR',
      estadoInicial: {
        globos: [],
        indexGlobo: 0,
        vidas: VIDAS_INICIALES,
        monedas: MONEDAS_INICIALES,
        ronda: RONDA_INICIAL,
        perdido: false,
        needsUIUpdate: false
      }
    });
  };

  return (
    <>
      <BarraNavegacion>

        <div className="info-ronda">
          <h2>Ronda: {gameState.ronda}</h2>
        </div>

        <BarraMonos
          monedas={gameState.monedas}
          vidas={gameState.vidas}
          >
          
          <Mono
            tipo={MONOS.basico.tipo}
            agarrarMono={() => agarrarMono(MONOS.basico.tipo)}
            sePuedeComprar={gameState.monedas >= MONOS.basico.precio}
            />
          <Mono
            tipo={MONOS.arco.tipo}
            agarrarMono={() => agarrarMono(MONOS.arco.tipo)}
            sePuedeComprar={gameState.monedas >= MONOS.arco.precio}
            />
          <Mono
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

          return (
            <CasillaMapa 
              key={index} 
              estado={estado}
              index={index}
              actualizarMapa={() => actualizarMapa(index)}
              globos={globosEnCasilla} 
              />
          )
        })}
      </div>

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