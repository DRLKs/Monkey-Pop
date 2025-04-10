// Bibliotecas de React
import React, { useMemo, useReducer, useState, useEffect, act } from 'react'

// Componentes
import { CasillaMapa } from '../components/CasillaMapa'
import MonoAgarrado from '../components/MonoAgarrado'
import FinJuego from '../components/FinJuego'
import AjustesContainerJuego from '../components/AjustesContainerJuego'
import AjustesMono from '../components/AjustesMono'
import ConfirmacionComponent from '../components/CofirmacionComponent';

// Clases 
import { Globo as GloboClass, Mono as MonoClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MENSAJES, MONOS, PARTIDA } from '../utils/constantes'
import { obtenerCaminoMapa } from '../utils/funciones'

// Estilos
import '../styles/juego.css'
import BarraNavegacionPartida from '../components/BarraNavegacionPartida'
import NuevaRondaContainer from '../components/NuevaRondaContainer'

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
            console.log('Mono atacando a globo:', globoAtacado.id, globoAtacado.health,mono.damage);

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
        needsUIUpdate: true,
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
      const nuevosMonos = state.monosColocados.filter(mono => mono.index !== action.index);
      return {
        ...state,
        monosColocados: nuevosMonos,
        monedas: state.monedas + action.precio
      };
      
    default:
      return state;
  }
}

function Juego() {
  const [mapa, setMapa] = useState(mapas.diagonal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [verAjustesMono, setVerAjustesMono] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoFin, setTiempoFin] = useState(null);
  const [ajustesVisible, setAjustesVisible] = useState(false);

  /* Constantes para el componente de la confirmación */
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [funcionConfirmacion, setFuncionConfirmacion] = useState(null);
  const [funcionConfirmacionNombre, setFuncionConfirmacionNombre] = useState(null);
  
  
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],                   // Guarda los globos que está sin explotar en el camino
    monosColocados: [],           // Guarda las posicies de los monos colocados por el usuario
    indexGlobo: 0,                // Controla el índice del último globo que salió, esto es para solo enviar los globos de cada ronda
    vidas: VIDAS_INICIALES,       // Mantiene la cuenta de vidas que le quedan al usuario
    monedas: MONEDAS_INICIALES,   // Mantiene la cuenta de las monedas que tiene ahorradas el usuario
    ronda: RONDA_INICIAL,         // Estado que controla la ronda por la que vamos
    perdido: false,               // Estado que cotrola que el jugador o haya perdido
    needsUIUpdate: false,       
    globosExplotados: 0,          // Mantiene la suma de los globos explotados durante todas las rodas
    nuevaRonda: true,             // Indica si estamos en un ronda nueva
    indexsGlobosExplotados: []    // Globos explotados por los monos durante el TICK
  });

  /*
   * Obtenemos el camino que deben seguir los globos
   */
  const camino = useMemo(() => {
    return obtenerCaminoMapa(mapa)
    
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
   * Cada vez que comience una ronda nuevva, aparecerá un mensaje en la pantalla informando de ello
   */
  useEffect(() => {
  
  }, [gameState.ronda])

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
      if ( gameState.nuevaRonda  ){       // Mantiene un margen entre ronda y ronda

        if ( elapsed >= PARTIDA.tiempoEntreRondas ){
          dispatch({
            type: 'TICK',
            camino: camino,
          });
        }
      }else {
        if (elapsed >= PARTIDA.tiempoActualizacionGlobos ) {
          if (!gameState.perdido) {
            dispatch({
              type: 'TICK',
              camino: camino,
            });
          }

          lastUpdateTime = timestamp;
        }
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
  }, [gameState.globos, gameState.perdido, gameState.nuevaRonda]);

  /*
   * Función que obtiene la casilla del mapa clicada 
   *
   * @param {Entero} index Índice del mapa que se ha clicado
   * @returns 
   */
  const actualizarMapa = (index) => {
    const estadoCasillaMarcada = mapa[index];
    setVerAjustesMono(null);  // Deselecciona el mono 
    if (estadoCasillaMarcada === ESTADO_CASILLA.AGUA || mapa[index] === ESTADO_CASILLA.CAMINO ) return;

    const monoExistente = gameState.monosColocados.find(mono => mono.index === index);  // En la casilla pinchada, hay un mono
    if (monoExistente) {
      setVerAjustesMono({ tipo: monoExistente.tipo, index: index });
      console.log('Mono seleccionado para ajustes:', monoExistente);
    }else if ( monoSeleccionado !== null ){ // Mono seleccionado
      const newMapa = [...mapa];
      const nuevoMono = new MonoClass(gameState.monosColocados.length,  // Si existe la posibilidad de quitar monos, esto dará error
                                        monoSeleccionado,
                                        index,
                                        MONOS[monoSeleccionado].damage,
                                        MONOS[monoSeleccionado].rango, 
                                        MONOS[monoSeleccionado].tiempoRecarga);
      dispatch({
        type: 'AGREGAR_MONO',
        mono: nuevoMono,
        precio: MONOS[monoSeleccionado].precio
      });
      setVerAjustesMono({ tipo: monoSeleccionado, index: index });
      setMonoSeleccionado(null);
      setMapa(newMapa);
    
    }



    
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
      setVerAjustesMono({ tipo: monoSeleccionado, index: 0 });
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

  const venderMono = () => {
    setVerAjustesMono(null);
    dispatch({
      type: 'VENDER_MONO',
      index: verAjustesMono.index,
      precio: MONOS[verAjustesMono.tipo].precio / 2
    });
  }

  /**
   * Función que se ejecutará para reiniciar los estados y comenzar una nueva partida 
   */
  const reiniciarJuego = () => {
    setTiempoInicio(Date.now());
    setTiempoFin(null);
    setMonoSeleccionado(null);
    setConfirmacionVisible(false);
    setAjustesVisible(false);
    setVerAjustesMono(null);
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
        needsUIUpdate: false,
        globosExplotados: 0,
        nuevaRonda: true,
        indexsGlobosExplotados: []
      }
    });
  };

  /**
   * Función que se ejecuta al hacer click en el botón de ajustes
   */
  const abrirAjustes = () => {
    setAjustesVisible(!ajustesVisible);
  }

  /**
   * Componente para confirmar acciones críticas
   * @param {*} funcion 
   */
  const abrirConfirmacion = (funcion, nombreFuncion) => {
    console.log('abrirConfirmacion', funcion);
    setConfirmacionVisible(true);
    setFuncionConfirmacion(() => funcion);
    setFuncionConfirmacionNombre(nombreFuncion);
  };

  return (
    <>
      <div className='fondo-juego'></div>
      <BarraNavegacionPartida 
        ronda={gameState.ronda}
        vidas={gameState.vidas}
        monedas={gameState.monedas}
        reiniciarJuego={() => abrirConfirmacion(reiniciarJuego, 'REINICIAR')}
        abrirAjustes={abrirAjustes}
        agarrarMono={agarrarMono}
      />

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
          const explotaGloboCasilla = gameState.indexsGlobosExplotados.some(idx => index === idx);
          
          return (
            <CasillaMapa 
              key={index} 
              estado={estado}
              index={index}
              actualizarMapa={() => actualizarMapa(index)}
              globos={globosEnCasilla} 
              monos={monosEnCasilla}
              explotaGloboCasilla={explotaGloboCasilla}
              />
          )
        })}
      </div>

      { verAjustesMono !== null && 
      <AjustesMono
        tipo={verAjustesMono.tipo}
        venderMono={venderMono}
        cerrar={() => setVerAjustesMono(null)}
      />
      }

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
          globosExplotados: gameState.globosExplotados
        }}
        onReiniciar={reiniciarJuego}
      />

      <NuevaRondaContainer
        visible={gameState.nuevaRonda}
        ronda={gameState.ronda}
      />

      {confirmacionVisible && (
        <ConfirmacionComponent
          msg={MENSAJES[funcionConfirmacionNombre].msg}
          msgAccion={MENSAJES[funcionConfirmacionNombre].msgAccion}
          funcion={() => {funcionConfirmacion(); setConfirmacionVisible(false);}}
          onClose={() => setConfirmacionVisible(false)}
        />
      )}

    </>
  )
}

export default Juego