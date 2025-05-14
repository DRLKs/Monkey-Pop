import React, { useMemo, useReducer, useState, useEffect } from 'react';

// Componentes
import { CasillaMapa } from '../components/CasillaMapa';
import MonoAgarrado from '../components/MonoAgarrado';
import BarraNavegacionTutorial from '../components/BarraNavegacionTutorial';
import AjustesMono from '../components/AjustesMono';
import FinJuego from '../components/FinJuego';
import OrientationWarning from '../components/OrientationWarning';
import ProTip from '../components/tutorial/ProTip';

// Clases
import { Mono as MonoClass } from '../utils/clases';

// Utilidades
import { mapas } from '../utils/mapas';
import { ESTADO_CASILLA, MONOS, PARTIDA, INFORMACION_TUTORIAL } from '../utils/constantes';
import { gameReducer, habilitadoParaJugar, obtenerCaminoMapa} from '../utils/funciones';

// Imágenes para el tutorial
import monoAncianoPrincipio from '../assets/images/tutorial/monoAncianoPrincipio.webp'
import monoAncianoApunta from '../assets/images/tutorial/monoAncianoApunta.webp';
import monoAncianoFinal from '../assets/images/tutorial/monoAncianoFinal.webp';
import globoMalvado from '../assets/images/tutorial/globoMalvado.webp';
import candadoAbierto from '../assets/images/tutorial/candadoTutorialAbierto.webp' 

// Funciones para el tutorial
import { puedeJugar } from '../utils/funciones.js';

// Estilos
import '../styles/juego.css';
import '../styles/tutorial.css';



function Tutorial() {
  // Estados del juego:
  const [mapa, setMapa] = useState(mapas.diagonal);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [monoVerAjustes, setMonoVerAjustes] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Estados del tutorial
  const [paso, setPaso] = useState(0);
  const [mostrarImagenTemporal, setMostrarImagenTemporal] = useState(false);
  const [tutorialTerminado, setTutorialTerminado] = useState(false);
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],
    monosColocados: [],
    indexGlobo: 0,
    vidas: PARTIDA.vidas_iniciales,
    monedas: 99999,   
    ronda: 1,
    perdido: false,
  });


  /**
   * Esta función solo se ejecuta una vez.
   * Esta obtiene el camino que deberán recorrer los globos según el mapa seleccionado
   */
  const camino = useMemo(() => obtenerCaminoMapa(mapa), [mapa]);


  /**
   * Función del tutorial que avanza al siguiente paso
   */
  const avanzarPaso = () => setPaso(paso + 1);


  /**
   * Función que pausa o reanuda el cronómetro del juego
   * Esta función se ejecuta al hacer click en el botón de pausa/reanudar en la barra de navegación
   */
  const pausarReaunudarCronometro = () => {
    setCronometroActivo(!cronometroActivo);
  }


  /**
   * Función que trackea la posición del ratón
   * Es usada para que la imagen del mono seleccionado parezca que es arrastrada por el jugador
   */
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


  /**
   * GameLoop, maneja el "tempo" del juego
   */
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


  /**
   * Esta función controla los pasos y las rondas del tutorial
   * Según sea necesario avanzará de paso, pausará el gameLoop ...
   */
  useEffect(() => {
    if (gameState.ronda > 5 && paso === 4) {
      setTutorialTerminado(true);
      if( !habilitadoParaJugar() ) {
        puedeJugar();
        mostrarCandado();
      }
    }
    if ( paso == 2 && gameState.ronda > 1 ) {
      pausarReaunudarCronometro();
      avanzarPaso();
    }
    console.log('Paso:', paso, 'Ronda:', gameState.ronda);

  }, [gameState.ronda]);


  /**
     * Función que se ejecuta al presionar una tecla
     */
    useEffect(() => {
      // Función que se ejecuta cuando se presiona una tecla
      const handleKeyDown = (event) => {
        // Obtener el código o nombre de la tecla presionada
        const key = event.key;
        
        // Diferentes acciones según la tecla presionada
        switch (key) {
          
          case '0':
            setMonoSeleccionado(null);
            break;
          case '1':
            setMonoSeleccionado(MONOS.basico.tipo);
            break;
          case '2':
            setMonoSeleccionado(MONOS.arco.tipo);
            break;
  
          case '3':
            setMonoSeleccionado(MONOS.fusil.tipo);
            break;
  
          case '4':
            setMonoSeleccionado(MONOS.artificiero.tipo);
            break;
  
          case '5':
            setMonoSeleccionado(MONOS.francotirador.tipo);
            break;
          
          case '6':
            setMonoSeleccionado(MONOS.laser.tipo);
            break;
  
          default:
            break;
        }
      };
    
      // Agregar el event listener
      window.addEventListener('keydown', handleKeyDown);
      
      // Función de limpieza que se ejecuta cuando el componente se desmonta
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [monoSeleccionado, cronometroActivo]); // Dependencias del useEffect


  /**
   * Mostrar la imagen del candado
   * @param {*} rutaImagen 
   */
  const mostrarCandado = () => {
    setMostrarImagenTemporal(true);
    
    // Ocultar la imagen después de 2 segundos
    setTimeout(() => {
      setMostrarImagenTemporal(false);
    }, 2000);
  };


  useEffect(() => {
      // Deshabilitamos el comportamiento predeterminado de eventos táctiles para prevenir el scroll
      const preventDefaultTouchMove = (e) => {
        if (monoSeleccionado !== null) {
          e.preventDefault();
        }
      };
  
      // Agregamos el event listener al document
      document.addEventListener('touchmove', preventDefaultTouchMove, { passive: false });
  
      // Limpieza al desmontar
      return () => {
        document.removeEventListener('touchmove', preventDefaultTouchMove);
      };
    }, [monoSeleccionado]);

  /**
   * Función que según la casilla clicada en el tablero realiza unas acciones u otras
   *
   * @param {Number} index Índice del mapa que se ha clicado
   * @returns 
   */
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

      }
    }
  };


  /**
   * Mejora un mono teniendo en cuenta su identificador
   * @param {Number} id Identificador
   */
  const mejorarMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio * 0.5;
    const incremento = MONOS[mono.tipo].damage * 0.5;
    dispatch({ type: 'MEJORAR_MONO', id, precio, incremento });
    if (paso === 3) avanzarPaso(), pausarReaunudarCronometro();
  };


  /**
   * Vende un mono teniendo en cuenta su identificador
   * @param {Number} id Identificador
   */
  const venderMono = (id) => {
    const mono = gameState.monosColocados.find((mono) => mono.id === id);
    const precio = MONOS[mono.tipo].precio / 2;
    dispatch({ type: 'VENDER_MONO', id, precio });
  };


  /**
   * Controla la orientación en los dispositivos pequeños
   */
  useEffect(() => {
      const checkOrientation = () => {
        // Detectar si la pantalla está en modo retrato (portrait)
        setIsPortrait(window.innerHeight > window.innerWidth);
      };
      
      // Verificar orientación inicial
      checkOrientation();
      
      // Agregar listener para cambios de orientación
      window.addEventListener('resize', checkOrientation);
      window.addEventListener('orientationchange', checkOrientation);
      
      // Limpiar listeners
      return () => {
        window.removeEventListener('resize', checkOrientation);
        window.removeEventListener('orientationchange', checkOrientation);
      };
  }, []);

  return (
    <>
    {isPortrait && window.innerWidth <= 739 && (
        <OrientationWarning />
      )}

    <div>
      <BarraNavegacionTutorial
        informacion={INFORMACION_TUTORIAL[paso].texto}
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
                <p>Hoy aprenderás a jugar Monkey Pop.</p>
                <button className="tutorial-button" onClick={avanzarPaso}>Comenzar</button>
              </div>
              <div className="tutorial-image">
                <img src={monoAncianoPrincipio} alt="Bienvenida al tutorial" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 1 && (
        <>
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
                <img src={monoAncianoApunta} alt="Selección de mono" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pro-tip-container">
        <ProTip 
          message={"Puedes seleccionar los monos con los números del teclado"}
        />
        </div>
        </>
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
                <p>Selecciona un mono del tablero para mejorarlo o venderlo. Coloca más monos para pasar de ronda.</p>
              </div>
              <div className="tutorial-image">
                <img src={monoAncianoApunta} alt="Mejora de monos" />
              </div>
            </div>
          </div>
        </div>
        )}
        {paso === 4 && tutorialTerminado &&(
        <div className="tutorial-container">
          <div className="tutorial-mensaje">
            <div className="tutorial-content">
              <div className="tutorial-text">
                <h2>¡Enhorabuena!</h2>
                <p> Completaste el tutorial.</p>
                <p><b> Ya eres todo un profesional</b>.</p>
                <p>Puedes volver a jugar el tutorial si lo necesitas</p>
              </div>
              <div className="tutorial-image">
                <img src={monoAncianoFinal} alt="Felicitaciones" />
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
      {/* Imagen temporal centrada */}
      {mostrarImagenTemporal && (
        <div className="imagen-temporal-overlay">
          <div className="imagen-temporal-container">
            <img 
              src={candadoAbierto} 
              alt="Candado abierto" 
              className="imagen-temporal" 
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Tutorial;