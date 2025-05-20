// Bibliotecas de React
import React, { useMemo, useReducer, useState, useEffect } from 'react'

// Componentes
import { CasillaMapa } from '../components/CasillaMapa'
import MonoAgarrado from '../components/MonoAgarrado'
import FinJuego from '../components/FinJuego'
import AjustesContainerJuego from '../components/AjustesContainerJuego'
import AjustesMono from '../components/AjustesMono'
import ConfirmacionComponent from '../components/CofirmacionComponent'
import OrientationWarning from '../components/OrientationWarning'
import Globo from '../components/Globo'
import MonoMapa from '../components/MonoMapa'
import globoExplotado from '../assets/images/globos/globoExplotado.webp';

// Clases 
import { Mono as MonoClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MENSAJES, MONOS, PARTIDA, MAPA_MOVIL } from '../utils/constantes'
import { obtenerCaminoMapa, gameReducer, isMovile } from '../utils/funciones'

// Estilos
import '../styles/juego.css'
import BarraNavegacionPartida from '../components/BarraNavegacionPartida'
import NuevaRondaContainer from '../components/NuevaRondaContainer'





function Juego() {
  const [mapa, setMapa] = useState( isMovile() ? mapas.diagonalMovil : mapas.diagonalMejorado);
  const [monoSeleccionado, setMonoSeleccionado] = useState(null);
  const [monoVerAjustes, setMonoVerAjustes] = useState(null);
  const [position, setPosition] = useState({x: 0, y:0});
  const [tiempoInicio, setTiempoInicio] = useState(Date.now());
  const [tiempoFin, setTiempoFin] = useState(null);
  const [ajustesVisible, setAjustesVisible] = useState(false);
  const [cronometroActivo, setCronometroActivo] = useState(true);

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
      setMonoSeleccionado(null);
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
      setMonoSeleccionado(null);
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
      {/* Mostrar advertencia si es móvil y está en portrait */}
      {isPortrait && (
        <OrientationWarning />
      )}
      
      <div className='fondo-juego'></div>
      <BarraNavegacionPartida 
        ronda={gameState.ronda}
        vidas={gameState.vidas}
        monedas={gameState.monedas}
        pararReaunudar={pausarReaunudarCronometro}
        reiniciarJuego={() => abrirConfirmacion(reiniciarJuego, 'REINICIAR')}
        abrirAjustes={abrirAjustes}
        agarrarMono={agarrarMono}
      />      
      
      {monoSeleccionado !== null && (
        <MonoAgarrado
          x={position.x}
          y={position.y}
          tipoMono={monoSeleccionado}
        />
        )}      <div className="game-container">
        {mapa.map((estado, index) => (
          <CasillaMapa 
            key={index} 
            estado={estado}
            index={index}
            actualizarMapa={() => actualizarMapa(index)}
          />
        ))}
        
        {/* Renderizar los monos por encima del mapa */}
        <div className="elementos-juego-container">
          {gameState.monosColocados.map((mono) => {
            // Calcular la posición basada en el índice de la casilla
            const casilla = document.querySelector(`.casilla-mapa[data-index="${mono.index}"]`);
            const rect = casilla ? casilla.getBoundingClientRect() : null;
            const gameContainer = document.querySelector('.game-container');
            const containerRect = gameContainer ? gameContainer.getBoundingClientRect() : null;
            
            const posX = rect ? rect.left - containerRect.left : 0;
            const posY = rect ? rect.top - containerRect.top : 0;
            
            return (
              <div 
                key={mono.id} 
                className="mono-container"
                style={{
                  position: 'absolute',
                  left: `${posX}px`,
                  top: `${posY}px`,
                  zIndex: 9000
                }}
              >
                <MonoMapa tipo={mono.tipo} />
              </div>
            );
          })}
          
          {/* Renderizar los globos por encima del mapa */}
          {gameState.globos.map((globo) => {
            // Calcular la posición basada en el índice de la casilla
            const casilla = document.querySelector(`.casilla-mapa[data-index="${globo.index}"]`);
            const rect = casilla ? casilla.getBoundingClientRect() : null;
            const gameContainer = document.querySelector('.game-container');
            const containerRect = gameContainer ? gameContainer.getBoundingClientRect() : null;
            
            const posX = rect ? rect.left - containerRect.left : 0;
            const posY = rect ? rect.top - containerRect.top : 0;
            
            return (
              <div 
                key={globo.id} 
                className="globo-container"
                style={{
                  position: 'absolute',
                  left: `${posX}px`,
                  top: `${posY}px`,
                  zIndex: 8000
                }}
              >
                <Globo health={globo.health} />
              </div>
            );
          })}
          
          {/* Renderizar las explosiones por encima del mapa */}
          {gameState.indexsGlobosExplotados.map((index) => {
            // Calcular la posición basada en el índice de la casilla
            const casilla = document.querySelector(`.casilla-mapa[data-index="${index}"]`);
            const rect = casilla ? casilla.getBoundingClientRect() : null;
            const gameContainer = document.querySelector('.game-container');
            const containerRect = gameContainer ? gameContainer.getBoundingClientRect() : null;
            
            const posX = rect ? rect.left - containerRect.left : 0;
            const posY = rect ? rect.top - containerRect.top : 0;
            
            return (
              <div 
                key={`explosion-${index}`} 
                className="explosion-container"
                style={{
                  position: 'absolute',
                  left: `${posX}px`,
                  top: `${posY}px`,
                  zIndex: 7000
                }}
              >
                <img className='globo-explotado' src={globoExplotado} />
              </div>
            );
          })}
        </div>
      </div>

      { monoVerAjustes !== null && 
      <AjustesMono
        mono={monoVerAjustes}
        venderMono={venderMono}
        funcionMejorarMono={(precio) => mejorarMono(precio)}
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
          monedas: gameState.monedas - PARTIDA.monedas_iniciales,
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