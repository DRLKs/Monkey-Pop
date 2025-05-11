import React, { useMemo, useReducer, useState, useEffect } from 'react';

// Componentes
import { CasillaMapa } from '../components/CasillaMapa';
import MonoAgarrado from '../components/MonoAgarrado';
import BarraNavegacionTutorial from '../components/BarraNavegacionTutorial';
import AjustesMono from '../components/AjustesMono';
import FinJuego from '../components/FinJuego';

// Clases
import { Globo as GloboClass, Mono as MonoClass } from '../utils/clases';

// Utilidades
import { mapas } from '../utils/mapas';
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes';
import { obtenerCaminoMapa } from '../utils/funciones';

// Imágenes para el tutorial
import monoAnciano from '../assets/images/tutorial/monoAnciano.png';
import globoMalvado from '../assets/images/tutorial/globoMalvado.png';

// Estilos
import '../styles/juego.css';
import '../styles/tutorial.css';

/**
 * 
 * @param {*} state Información del estado del juego
 * @param {GloboClass[]} state.globos Lista de globos en el juego
 * @param {number} state.indexGlobo Índice del globo actual
 * @param {number} state.vidas Vidas restantes del jugador
 * @param {number} state.monedas Monedas del jugador
 * @param {number} state.ronda Ronda actual del juego
 * @param {boolean} state.perdido Indica si el jugador ha perdido
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
}

function Tutorial() {

  // Estados del juego:
  const [mapa, setMapa] = useState(mapas.diagonal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [monoVerAjustes, setMonoVerAjustes] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [cronometroActivo, setCronometroActivo] = useState(false);

  // Estados del tutorial
  const [paso, setPaso] = useState(0);
  const [tutorialTerminado, setTutorialTerminado] = useState(false); // Nuevo estado para controlar el final del tutorial
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],
    monosColocados: [],
    indexGlobo: 0,
    vidas: PARTIDA.vidas_iniciales,
    monedas: 999,   
    ronda: 1, // Inicia en la ronda 1
    perdido: false,
  });

  const camino = useMemo(() => obtenerCaminoMapa(mapa), [mapa]);

  /**
   * Función del tutorial que avanza al siguiente paso
   */
  const avanzarPaso = () => setPaso(paso + 1);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    if (monoSeleccionado !== null) {
      window.addEventListener('pointermove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, [monoSeleccionado]);

  // Bucle de juego actualizado
  useEffect(() => {
    let lastUpdateTime = 0;
    let animationFrameId;

    const gameLoop = (timestamp) => {
      if ( !cronometroActivo ) return;
      if (!lastUpdateTime) lastUpdateTime = timestamp;

      const elapsed = timestamp - lastUpdateTime;
      if (elapsed >= PARTIDA.tiempoActualizacionGlobos) {
        dispatch({
          type: 'TICK',
          camino
        });
        lastUpdateTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camino, paso]);

  useEffect(() => {
    // Detectar si el tutorial ha terminado después de 2 rondas adicionales
    if (gameState.ronda > 5 && paso === 4) {
      setTutorialTerminado(true);
    }
    if ( paso == 2 && gameState.ronda > 1 ) {
      pausarReaunudarCronometro();
      avanzarPaso();
    }
    console.log('Paso:', paso, 'Ronda:', gameState.ronda);

  }, [gameState.ronda]);


  const actualizarMapa = (index) => {
    const estadoCasilla = mapa[index];
    setMonoVerAjustes(null);

    if (estadoCasilla === ESTADO_CASILLA.AGUA || estadoCasilla === ESTADO_CASILLA.CAMINO) return;

    const monoExistente = gameState.monosColocados.find((mono) => mono.index === index);
    if (monoExistente) {
      setMonoVerAjustes(monoExistente);
    }else if (monoSeleccionado !== null) {
      const nuevoMono = new MonoClass(
        gameState.monosColocados.length,
        MONOS[monoSeleccionado].tipo,
        index,
        MONOS[monoSeleccionado].damage,
        MONOS[monoSeleccionado].rango,
        MONOS[monoSeleccionado].tiempoRecarga
      );
      dispatch({ type: 'AGREGAR_MONO', mono: nuevoMono, precio: MONOS[monoSeleccionado].precio });
      setMonoSeleccionado(null);


      if (paso === 1) {
        avanzarPaso();
        pausarReaunudarCronometro();

      } else if (paso === 3) {
        // Avanzar al paso 4 después de colocar un mono
        avanzarPaso();
      }
    }
  };

  const mejorarMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio * 0.5;
    const incremento = MONOS[mono.tipo].damage * 0.5;
    dispatch({ type: 'MEJORAR_MONO', id, precio, incremento });
    if (paso === 3) avanzarPaso(), pausarReaunudarCronometro();
  };

  const venderMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio / 2;
    dispatch({ type: 'VENDER_MONO', id, precio });
  };

  /**
   * Función que pausa o reanuda el cronómetro del juego
   * Esta función se ejecuta al hacer click en el botón de pausa/reanudar en la barra de navegación
   */
  const pausarReaunudarCronometro = () => {
    setCronometroActivo(!cronometroActivo);
  }
  return (
    <div>
      <BarraNavegacionTutorial
        vidas={gameState.vidas}
        monedas={gameState.monedas}
        agarrarMono={(tipoMono) => setMonoSeleccionado(tipoMono)}
      />
      {monoSeleccionado && (
        <MonoAgarrado x={position.x} y={position.y} tipoMono={monoSeleccionado} />
      )}
        {paso === 0 && (
        <div className="tutorial-container-bienvenida">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>Bienvenido al tutorial</h2>
                <p>Aquí aprenderás a jugar Monkey Pop.</p>
                <button className="tutorial-button" onClick={avanzarPaso}>Comenzar</button>
              </div>
              <div className="tutorial-image">
                <img src={monoAnciano} alt="Bienvenida al tutorial" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 1 && (
        <div className="tutorial-container">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>Selecciona un mono</h2>
                <p>Nuestros monos están arriba a la derecha.</p>
                <p>Arrastra el que quieras a una casilla de cesped del mapa. </p>
                <p>Ellos son nuestros héroes, nos defienden de .....</p>
              </div>
              <div className="tutorial-image">
                <img src={monoAnciano} alt="Selección de mono" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 2 && (
        <div className="tutorial-container">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>¡LOS GLOBOS!</h2>
                <p>Estas bestias hechas de plástico no pueden llegar al final del camino</p>
                <p>Nuestros aliados moniles intentarán explotarlos</p>
              </div>
              <div className="tutorial-image">
                <img src={globoMalvado} alt="Globos" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 3 && (
        <div className="tutorial-container">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>Mejora y vende monos</h2>
                <p>Selecciona un mono para mejorarlo o venderlo. Coloca más monos para pasar de ronda.</p>
              </div>
              <div className="tutorial-image">
                <img src={monoAnciano} alt="Mejora de monos" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 4 && tutorialTerminado && (
        <div className="tutorial-container">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>¡Enhorabuena!</h2>
                <p>Has completado el tutorial. Ahora puedes jugar libremente.</p>
                <p>Puedes volve a jugar el tutorail si lo crees necesario</p>
              </div>
              <div className="tutorial-image">
                <img src={monoAnciano} alt="Felicitaciones" />
                <button className='tutorial-button' onClick={() => window.location.reload()}>Volver a jugar</button>
              </div>
            </div>
          </div>
        </div>
        )}
      <div className="game-container">
        {mapa.map((estado, index) => (
          <CasillaMapa
            key={index}
            estado={estado}
            index={index}
            actualizarMapa={() => actualizarMapa(index)}
            globos={gameState.globos.filter((globo) => globo.index === index)}
            monos={gameState.monosColocados.filter((mono) => mono.index === index)}
          />
        ))}
      </div>
      {monoVerAjustes && (
        <AjustesMono
          mono={monoVerAjustes}
          venderMono={() => venderMono(monoVerAjustes.id)}
          funcionMejorarMono={() => mejorarMono(monoVerAjustes.id)}
          cerrar={() => setMonoVerAjustes(null)}
        />
      )}
      {gameState.perdido && (
        <FinJuego
          visible={gameState.perdido}
          onReiniciar={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Tutorial;