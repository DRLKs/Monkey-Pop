import React, { useMemo, useReducer, useState, useEffect } from 'react';

// Componentes
import { CasillaMapa } from '../components/CasillaMapa';
import MonoAgarrado from '../components/MonoAgarrado';
import BarraNavegacionPartida from '../components/BarraNavegacionPartida';
import AjustesMono from '../components/AjustesMono';
import FinJuego from '../components/FinJuego';

// Clases
import { Globo as GloboClass, Mono as MonoClass } from '../utils/clases';

// Utilidades
import { mapas } from '../utils/mapas';
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes';
import { obtenerCaminoMapa } from '../utils/funciones';

// Estilos
import '../styles/juego.css';

// Reducer actualizado para manejar el ataque de los monos
function gameReducer(state, action) {
  switch (action.type) {
    case 'TICK':
      const globosTablero = [...state.globos];
      const monos = state.monosColocados;
      const globosAEliminar = [];
      let vidasPerdidas = 0;

      // Actualizamos la posición de los globos
      globosTablero.forEach((globo) => {
        globo.addTiempoDeVida();
        const tiempoDeVida = globo.getTiempoDeVida();

        if (tiempoDeVida >= action.camino.length) {
          globosAEliminar.push(globo.id);
          vidasPerdidas += globo.getHealth();

          // Detectar si el globo fuerte llegó al final
          if (globo.id === 999 && action.onGloboFinal) {
            action.onGloboFinal(); // Llamar al callback para avanzar el tutorial
          }
        } else {
          globo.setPosition(action.camino[tiempoDeVida]);
        }
      });

      // Actualizamos los monos
      let sumaMonedas = 0;
      monos.forEach((mono) => {
        if (mono.puedeAtacar()) {
          const globosExistentes = globosTablero.filter(
            (globo) => !globosAEliminar.includes(globo.id) && globo.id !== 999 // Proteger el globo fuerte
          );
          const globoAtacado = mono.attack(globosExistentes);
          if (globoAtacado && globoAtacado.health <= mono.damage) {
            sumaMonedas += PARTIDA.monedasGlobo;
            globosAEliminar.push(globoAtacado.id);
          }
        }
      });

      // Eliminamos los globos destruidos
      globosAEliminar.forEach((id) => {
        const index = globosTablero.findIndex((globo) => globo.id === id);
        if (index !== -1) globosTablero.splice(index, 1);
      });

      if (vidasPerdidas >= state.vidas) {
        return { ...state, vidas: 0, perdido: true };
      }

      // Generar nuevos globos si es necesario
      if (state.indexGlobo < PARTIDA.rondas[state.ronda - 1].length) {
        const health = PARTIDA.rondas[state.ronda - 1][state.indexGlobo];
        const nuevoGlobo = new GloboClass(state.indexGlobo, action.camino[0], health, 0);
        globosTablero.push(nuevoGlobo);
      } else {
        // Si no quedan globos de la ronda, se pasa a la siguiente ronda
        if (globosTablero.length === 0) {
          return { ...state, globos: globosTablero, indexGlobo: 0, ronda: state.ronda + 1 };
        }
      }

      return {
        ...state,
        globos: globosTablero,
        indexGlobo: state.indexGlobo + 1,
        vidas: state.vidas - vidasPerdidas,
        monedas: state.monedas + sumaMonedas,
      };

    case 'AGREGAR_MONO':
      return {
        ...state,
        monosColocados: [...state.monosColocados, action.mono],
        monedas: state.monedas - action.precio,
      };

    case 'AGREGAR_GLOBO':
      return {
        ...state,
        globos: [...state.globos, action.globo],
      };

    case 'MEJORAR_MONO':
      return {
        ...state,
        monosColocados: state.monosColocados.map((mono) =>
          mono.id === action.id ? { ...mono, damage: mono.damage + action.incremento } : mono
        ),
        monedas: state.monedas - action.precio,
      };

    case 'VENDER_MONO':
      return {
        ...state,
        monosColocados: state.monosColocados.filter((mono) => mono.id !== action.id),
        monedas: state.monedas + action.precio,
      };

    default:
      return state;
  }
}

function Tutorial() {
  const [paso, setPaso] = useState(0);
  const [mapa, setMapa] = useState(mapas.diagonal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [monoVerAjustes, setMonoVerAjustes] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [globosActivos, setGlobosActivos] = useState(false);
  const [tutorialTerminado, setTutorialTerminado] = useState(false); // Nuevo estado para controlar el final del tutorial
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],
    monosColocados: [],
    indexGlobo: 0,
    vidas: PARTIDA.vidas_iniciales,
    monedas: PARTIDA.monedas_iniciales,
    ronda: 1, // Inicia en la ronda 1
    perdido: false,
  });

  const camino = useMemo(() => obtenerCaminoMapa(mapa), [mapa]);

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
      if (!lastUpdateTime) lastUpdateTime = timestamp;

      const elapsed = timestamp - lastUpdateTime;
      if (globosActivos && elapsed >= PARTIDA.tiempoActualizacionGlobos) {
        dispatch({
          type: 'TICK',
          camino,
          onGloboFinal: () => {
            if (paso === 2) {
              setPaso(3); // Avanzar al siguiente paso del tutorial
              setGlobosActivos(false); // Detener los globos
            }
          },
        });
        lastUpdateTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camino, globosActivos, paso]);

  useEffect(() => {
    // Detectar si el tutorial ha terminado después de 2 rondas adicionales
    if (gameState.ronda > 5 && paso === 4) {
      setTutorialTerminado(true);
    }
  }, [gameState.ronda, paso]);

  const avanzarPaso = () => setPaso(paso + 1);

  const actualizarMapa = (index) => {
    const estadoCasilla = mapa[index];
    setMonoVerAjustes(null);

    if (estadoCasilla === ESTADO_CASILLA.AGUA || estadoCasilla === ESTADO_CASILLA.CAMINO) return;

    const monoExistente = gameState.monosColocados.find((mono) => mono.index === index);
    if (monoExistente) {
      setMonoVerAjustes(monoExistente);
      return;
    }

    if (monoSeleccionado !== null) {
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

      const nuevoMapa = [...mapa];
      nuevoMapa[index] = ESTADO_CASILLA.MONO;
      setMapa(nuevoMapa);

      if (paso === 1) {
        avanzarPaso();

        setTimeout(() => {
          setGlobosActivos(true);

          // Restaurar el globo con 50 de vida
          const globoFuerte = new GloboClass(999, camino[0], 50, 0);
          dispatch({ type: 'AGREGAR_GLOBO', globo: globoFuerte });
        }, 1000);
      } else if (paso === 3) {
        // Avanzar al paso 4 después de colocar un mono
        avanzarPaso();
        setGlobosActivos(true);
      }
    }
  };

  const mejorarMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio * 0.5;
    const incremento = MONOS[mono.tipo].damage * 0.5;
    dispatch({ type: 'MEJORAR_MONO', id, precio, incremento });
    if (paso === 3) avanzarPaso();
  };

  const venderMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio / 2;
    dispatch({ type: 'VENDER_MONO', id, precio });
  };

  return (
    <div>
      <BarraNavegacionPartida
        vidas={gameState.vidas}
        monedas={gameState.monedas}
        agarrarMono={(tipoMono) => setMonoSeleccionado(tipoMono)}
      />
      {monoSeleccionado && (
        <MonoAgarrado x={position.x} y={position.y} tipoMono={monoSeleccionado} />
      )}
      <div className="tutorial-container">
        {paso === 0 && (
          <div className="tutorial-mensaje">
            <h2>Bienvenido al tutorial</h2>
            <p>Aquí aprenderás a jugar Monkey Pop.</p>
            <button onClick={avanzarPaso}>Comenzar</button>
          </div>
        )}
        {paso === 1 && (
          <div className="tutorial-mensaje">
            <h2>Selecciona un mono</h2>
            <p>Los monos están arriba a la derecha. Selecciona uno y colócalo en el mapa.</p>
          </div>
        )}
        {paso === 2 && (
          <div className="tutorial-mensaje">
            <h2>¡Globos!</h2>
            <p>Observa cómo los monos atacan a los globos y ganas monedas. Un globo llegará al final para mostrar que te hace daño.</p>
          </div>
        )}
        {paso === 3 && (
          <div className="tutorial-mensaje">
            <h2>Mejora y vende monos</h2>
            <p>Selecciona un mono para mejorarlo o venderlo. Coloca más monos para pasar de ronda.</p>
          </div>
        )}
        {paso === 4 && tutorialTerminado && (
          <div className="tutorial-mensaje">
            <h2>¡Enhorabuena!</h2>
            <p>Has completado el tutorial. Ahora puedes jugar libremente.</p>
          </div>
        )}
      </div>
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