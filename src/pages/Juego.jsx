// Bibliotecas de React
import React, { useMemo, useReducer, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

// Componentes
import { CasillaMapa } from '../components/CasillaMapa'
import MonoAgarrado from '../components/MonoAgarrado'
import FinJuego from '../components/FinJuego'
import AjustesContainerJuego from '../components/AjustesContainerJuego'
import AjustesMono from '../components/AjustesMono'
import ConfirmacionComponent from '../components/CofirmacionComponent';
import OrientationWarning from '../components/OrientationWarning';

// Clases 
import { Mono as MonoClass } from '../utils/clases'

// Utilidades
import { mapas_ordenador, mapas_movil } from '../utils/mapas'
import { ESTADO_CASILLA, MENSAJES, MONOS, PARTIDA, MAPA_MOVIL } from '../utils/constantes'
import { obtenerCaminoMapa, gameReducer, isMovile } from '../utils/funciones'

// Estilos
import '../styles/juego.css'
import BarraNavegacionPartida from '../components/BarraNavegacionPartida'
import NuevaRondaContainer from '../components/NuevaRondaContainer'





function Juego() {

  const navigate = useNavigate()

  //const [mapa, setMapa] = useState( isMovile() ? mapas.diagonalMovil : mapas.diagonalMejorado);
  const [mapa, setMapa] = useState( isMovile() ? mapas_movil : mapas_ordenador);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [monoVerAjustes, setMonoVerAjustes] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoFin, setTiempoFin] = useState(null);
  const [ajustesVisible, setAjustesVisible] = useState(false);
  const [cronometroActivo, setCronometroActivo] = useState(true);

  // Guarda el índice multiplicactivo, que hará que el juego vaya más rápido o más lento
  const[potenciadorVelocidadJuego, setPotenciadorVelocidadJuego] = useState(3); 

  /* Constantes para el componente de la confirmación */
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [funcionConfirmacion, setFuncionConfirmacion] = useState(null);
  const [funcionConfirmacionNombre, setFuncionConfirmacionNombre] = useState(null);
  
  // Para configurar la orientación
  const [isPortrait, setIsPortrait] = useState(false);

  
  const [gameState, dispatch] = useReducer(gameReducer, {
    globos: [],                       // Guarda los globos que está sin explotar en el camino
    monosColocados: [],               // Guarda las posicies de los monos colocados por el usuario
    indexGlobo: 0,                    // Controla el índice del último globo que salió, esto es para solo enviar los globos de cada ronda
    vidas: PARTIDA.vidas_iniciales,       // Mantiene la cuenta de vidas que le quedan al usuario
    monedas: PARTIDA.monedas_iniciales,   // Mantiene la cuenta de las monedas que tiene ahorradas el usuario
    ronda: PARTIDA.ronda_inicial,         // Estado que controla la ronda por la que vamos
    perdido: false,                   // Estado que cotrola que el jugador o haya perdido
    globosExplotados: 0,              // Mantiene la suma de los globos explotados durante todas las rodas
    nuevaRonda: true,                 // Indica si estamos en un ronda nueva
    indexsGlobosExplotados: []        // Globos explotados por los monos durante el TICK
  });

  /*
   * Obtenemos el camino que deben seguir los globos
   */
  const camino = useMemo(() => {
    if( isMovile() )  return obtenerCaminoMapa(mapa, MAPA_MOVIL.ancho_mapa, MAPA_MOVIL.largo_mapa);
    else              return obtenerCaminoMapa(mapa, PARTIDA.ancho_mapa, PARTIDA.largo_mapa);

  }, []);


  /**
   * Función para volver, salir del juego
   */
  const volver = () => {
    navigate('/');
  }


  /**
   * Deselecciona el mono
   */
  const soltarMono = () => {
    setMonoSeleccionado(null);
  }

  // Agregar después de las importaciones y antes de la función Juego


  // Efecto para activar pantalla completa automáticamente
  useEffect(() => {
    const activarPantallaCompleta = async () => {
      try {
        // Verificar si ya estamos en pantalla completa
        if (!document.fullscreenElement) {
          // Intentar diferentes métodos según el navegador
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            await document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            await document.documentElement.msRequestFullscreen();
          }
        }
      } catch (error) {
        console.log('No se pudo activar pantalla completa automáticamente:', error);
      }
    };

    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // En móviles, activar en la primera interacción del usuario
      const handleFirstInteraction = () => {
        activarPantallaCompleta();
        // Remover todos los listeners después de la primera activación
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
      
      // Agregar múltiples tipos de eventos para capturar la primera interacción
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });
      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
    } else {
      // En escritorio, activar inmediatamente
      activarPantallaCompleta();
    }

    // Prevenir zoom con gestos táctiles
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('gesturestart', preventZoom, { passive: false });

    // Cleanup
    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('gesturestart', preventZoom);
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  // ...resto de tu código existente...

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
      if ( !cronometroActivo ) return;
      if ( !lastUpdateTime ) lastUpdateTime = timestamp;
      
      const elapsed = timestamp - lastUpdateTime;
      if ( gameState.nuevaRonda  ){       // Mantiene un margen entre ronda y ronda

        if ( elapsed >= PARTIDA.tiempoEntreRondas ){
          dispatch({
            type: 'TICK',
            camino: camino,
          });
        }
      }else {
        if (elapsed >= PARTIDA.tiempoActualizacionGlobos * PARTIDA.potenciadorTiempo[potenciadorVelocidadJuego] ) {
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
  }, [gameState.globos, gameState.perdido, gameState.nuevaRonda, cronometroActivo]);


  /**
   * Función que según la casilla clicada en el tablero realiza unas acciones u otras
   *
   * @param {Number} index Índice del mapa que se ha clicado
   * @returns 
   */
  const actualizarMapa = (index) => {
    const estadoCasillaMarcada = mapa[index];
    setMonoVerAjustes(null);  // Deselecciona el mono 
    if (estadoCasillaMarcada === ESTADO_CASILLA.AGUA || mapa[index] === ESTADO_CASILLA.CAMINO 
        || estadoCasillaMarcada === ESTADO_CASILLA.TIERRA_CESPED1 || estadoCasillaMarcada === ESTADO_CASILLA.TIERRA_CESPED2
        || estadoCasillaMarcada === ESTADO_CASILLA.AGUA_CESPED1 || estadoCasillaMarcada === ESTADO_CASILLA.AGUA_CESPED2
        || estadoCasillaMarcada === ESTADO_CASILLA.FLORAZUL || estadoCasillaMarcada === ESTADO_CASILLA.FLORROJA
    ) return;

    const monoExistente = gameState.monosColocados.find(mono => mono.index === index);  // En la casilla pinchada, hay un mono
    if (monoExistente) {
      setMonoVerAjustes( monoExistente );
      console.log('Mono seleccionado para ajustes:', monoExistente);
    }else if ( monoSeleccionado !== null ){ // Mono seleccionado
      const newMapa = [...mapa];
      const nuevoMono = new MonoClass(gameState.monosColocados.length,  // Si existe la posibilidad de quitar monos, esto dará error
                                        MONOS[monoSeleccionado].tipo,
                                        index,
                                        MONOS[monoSeleccionado].damage,
                                        MONOS[monoSeleccionado].rango, 
                                        MONOS[monoSeleccionado].tiempoRecarga);
      dispatch({
        type: 'AGREGAR_MONO',
        mono: nuevoMono,
        precio: MONOS[monoSeleccionado].precio
      });
      soltarMono();
      setMapa(newMapa);
    
    }
  }

  
  /**
   * Función que trackea la posición del ratón
   * Es usada para que la imagen del mono seleccionado parezca que es arrastrada por el jugador
   */
  useEffect(() => {
    const controladorMovimientoRaton = (event) => {
      // Usar clientX/Y para navegadores de escritorio y touches[0] para dispositivos móviles
      const posX = event.touches ? event.touches[0].clientX : event.clientX;
      const posY = event.touches ? event.touches[0].clientY : event.clientY;
      setPosition({x: posX, y: posY});
    }
    
    if (monoSeleccionado !== null) {
      // Soportar tanto eventos de mouse como eventos táctiles
      window.addEventListener('pointermove', controladorMovimientoRaton);
      window.addEventListener('touchmove', controladorMovimientoRaton, { passive: false });
    }
    
    return () => {
      window.removeEventListener('pointermove', controladorMovimientoRaton);
      window.removeEventListener('touchmove', controladorMovimientoRaton);
    }
  }, [monoSeleccionado]);


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
        case 'Escape':
          // Por ejemplo, cancelar el mono seleccionado
          setAjustesVisible(true);
          break;
        case ' ':
          // Espacio para pausar/reanudar
          pausarReaunudarCronometro();  // Habrá que ponerlo en el botón de pausa para poder actualizarlo
          break;
        case '0':
          soltarMono();
          break;
        case '1':
          if (gameState.monedas < MONOS.basico.precio) soltarMono();
          else setMonoSeleccionado(MONOS.basico.tipo);
          break;
        case '2':
          if (gameState.monedas < MONOS.arco.precio) soltarMono();
          else setMonoSeleccionado(MONOS.arco.tipo);
          break;

        case '3':
          if (gameState.monedas < MONOS.fusil.precio) soltarMono();
          else setMonoSeleccionado(MONOS.fusil.tipo);
          break;

        case '4':
          if (gameState.monedas < MONOS.artificiero.precio) soltarMono();
          else setMonoSeleccionado(MONOS.artificiero.tipo);
          break;

        case '5':
          if (gameState.monedas < MONOS.francotirador.precio) soltarMono();
          else setMonoSeleccionado(MONOS.francotirador.tipo);
          break;
        
        case '6':
          if (gameState.monedas < MONOS.laser.precio) soltarMono();
          else setMonoSeleccionado(MONOS.laser.tipo);
          break;

        case 'p':
          // Pausar el juego
          pausarReaunudarCronometro();
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
   * Función que controla el manejo de los monos seleccionados
   * Se ejecuta arrastrando o clicando en un mono de la barra de navegación
   * @param {string} tipoMono Tipo de mono seleccionado
   */
  const agarrarMono = (tipoMono) => {
    // Si ya está seleccionado, lo deseleccionamos; si no, lo seleccionamos
    console.log("Agarrando mono:", tipoMono, "Mono seleccionado actualmente:", monoSeleccionado);
    if (monoSeleccionado === tipoMono) {
      soltarMono();
    } else {
      setMonoSeleccionado(tipoMono);
    }
  }


  /**
   * Vende un mono teniendo en cuenta su identificador
   * @param {Number} id Identificador
   */
  const venderMono = () => {
    setMonoVerAjustes(null);
    console.log('Vender mono:', monoVerAjustes);
    dispatch({
      type: 'VENDER_MONO',
      id: monoVerAjustes.id,
      precio: MONOS[monoVerAjustes.tipo].precio / 2
    });
  }

  /**
   * Mejora un mono teniendo en cuenta su identificador
   * @param {Number} id Identificador
   */
  const mejorarMono = (precio) => {
      dispatch({
        type: 'MEJORAR_MONO',
        precio: precio
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
    setMonoVerAjustes(null);
    dispatch({
      type: 'REINICIAR',
      estadoInicial: {
        globos: [],
        monosColocados: [],
        indexGlobo: 0,
        vidas: PARTIDA.vidas_iniciales,
        monedas: PARTIDA.monedas_iniciales,
        ronda: PARTIDA.ronda_inicial,
        perdido: false,
        globosExplotados: 0,
        nuevaRonda: true,
        indexsGlobosExplotados: []
      }
    });
  };

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

  /**
   * Función que pausa o reanuda el cronómetro del juego
   * Esta función se ejecuta al hacer click en el botón de pausa/reanudar en la barra de navegación
   */
  const pausarReaunudarCronometro = () => {
    setCronometroActivo(!cronometroActivo);
  }

  /**
   * Función que se ejecuta al hacer click en el botón de ajustes
   */
  const abrirAjustes = () => {
    const estaranLosAjustesVisibles = !ajustesVisible;
    setAjustesVisible(estaranLosAjustesVisibles);
  }

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

  // Effect para manejar cambios de orientación
  useEffect(() => {
    const checkOrientation = () => {
      // Detectar si la pantalla está en modo retrato (portrait)
      if( window.innerHeight > window.innerWidth) {
        setIsPortrait(true);
        setCronometroActivo(false);
      }else{
        setIsPortrait(false);
        setCronometroActivo(true);
      }
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

  // Pausar el juego automáticamente cuando se abran los ajustes
  useEffect(() => {
    if (ajustesVisible) {
      setCronometroActivo(false);
    } else {
      setCronometroActivo(true);
    }
  }, [ajustesVisible]);
  
  return (
    <>
      <Helmet>
        <title>Monkey Pop - Juego</title>
      </Helmet>
      {/* Mostrar advertencia si es móvil y está en portrait */}
      {isPortrait && (
        <OrientationWarning />
      )}
      <h1 className="visually-hidden">Página de Juego de Monkey Pop</h1>
      <div className='fondo-juego'></div>
      <BarraNavegacionPartida 
        ronda={gameState.ronda}
        vidas={gameState.vidas}
        monedas={gameState.monedas}
        pararReaunudar={pausarReaunudarCronometro}
        reiniciarJuego={() => abrirConfirmacion(reiniciarJuego, 'REINICIAR')}
        abrirAjustes={abrirAjustes}
        agarrarMono={agarrarMono}
        cronometroActivo={cronometroActivo}
        ralentizarJuego={() => setPotenciadorVelocidadJuego(Math.min(potenciadorVelocidadJuego + 1, 5))}
        acelerarJuego={() => setPotenciadorVelocidadJuego(Math.max(potenciadorVelocidadJuego - 1, 0))}
        funcionVolver={() => abrirConfirmacion(volver, 'VOLVER')}
      />      
      
      {monoSeleccionado !== null && (
        <MonoAgarrado
          x={position.x}
          y={position.y}
          tipoMono={monoSeleccionado}
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
              monoVerAjustes={monoVerAjustes}
              />
          )
        })}
      </div>

      { monoVerAjustes !== null && 
      <AjustesMono
        mono={monoVerAjustes}
        venderMono={venderMono}
        funcionMejorarMono={(precio) => mejorarMono(precio)}
        monedas={gameState.monedas}
        cerrar={() => setMonoVerAjustes(null)}
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
  );
}

export default Juego