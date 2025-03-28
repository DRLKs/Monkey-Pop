// Bibliotecas de React
import React, { useMemo } from 'react'
import { useState } from 'react'

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion'
import { CasillaMapa } from '../components/CasillaMapa'
import { BarraMonos } from '../components/BarraMonos'
import { Mono } from '../components/Mono'
import MonoAgarrado from '../components/MonoAgarrado'

// Clases
import { Globo as GloboClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes'

// Estilos
import '../styles/juego.css'

// Constantes del juego
const MONEDAS_INICIALES = 170;
const VIDAS_INICIALES = 150;
const RONDA_INICIAL = 1;

function Juego() {
  
  const [perdido, setPerdido] = useState(false)                     // Estado con la variable que indica si el jugador ha perdido o no

  const [mapa, setMapa] = useState( mapas.diagonal)                     // Estado con la forma del mapa, inicializamos el mapa que queramos jugar
  const [monedas, setMonedas] = useState(MONEDAS_INICIALES)             // Estado con la cantidad de monedas que tiene el jugador
  const [vidas, setVidas] = useState(VIDAS_INICIALES)                   // Estado con la cantidad de vidas que tiene el jugador
  const [rondaActual, setRonda] = useState(RONDA_INICIAL)               // Estado con la ronda actual del juego
  
  const [globos, setGlobos] = useState([])                              // Estado con los globos que aparecen en el mapa
  const [indexGlobo, setIndexGlobo] = useState(0)                       // Estado con el índice del globo que aparece en el mapa


  const [monoSeleccionado, setMonoSeleccionado] = useState(null)        // Estado con el mono seleccionado
  const [monosTablero, setMonosTablero] = useState([])                  // Estado con los monos que hay en el tablero
  const [position, setPosition] = useState({x: 0, y:0})                 // Estado con la posición del ratón, para que le siga el mono seleccionado

  const[casillaSeleccionada, setCasillaSeleccionada] = useState(null)   // Estado con el índice de la casilla seleccionada

  // Refs para almacenar valores que no necesitan causar re-render
  const indexGloboRef = React.useRef(0);
  const vidasRef = React.useRef(VIDAS_INICIALES);
  const globosRef = React.useRef([]);
  const perdidoRef = React.useRef(false);
  const rondaActualRef = React.useRef(RONDA_INICIAL);
  
  // Actualizar refs cuando cambian los estados
  React.useEffect(() => {
    indexGloboRef.current = indexGlobo;
  }, [indexGlobo]);
  
  React.useEffect(() => {
    vidasRef.current = vidas;
  }, [vidas]);
  
  React.useEffect(() => {
    globosRef.current = globos;
  }, [globos]);
  
  React.useEffect(() => {
    perdidoRef.current = perdido;
  }, [perdido]);
  
  React.useEffect(() => {
    rondaActualRef.current = rondaActual;
  }, [rondaActual]);

  // Función para obtener el array de caminos, para que los globos la puedan recorrer
  const camino = useMemo(() => {
    console.log("Incializando el juego")
    const caminos = []
    let posicionAnterior
    let posicionActual

    // Buscamos nuestra posición inicial, que es la primera casilla de camino
    // El camino siempre empieza a la izquierda
    for (let i = 0; i < mapa.length; i = i + 20) {
      if (mapa[i] === ESTADO_CASILLA.CAMINO) {
        posicionActual = i
        posicionAnterior = i - 1
        break
      }
    }

    let caminoTerminado = false
    let movimiento
    // Buscamos el camino, que es la casilla de camino, y lo guardamos en el array caminos
    while( caminoTerminado === false)  { 
      caminos.push(posicionActual) 
      movimiento = 0
      // Buscamos la siguiente casilla de camino, que es la que está a la derecha, abajo o arriba de la casilla actual
      if ( posicionActual + 1 % 20 !== 0 && posicionActual + 1 !== posicionAnterior && mapa[posicionActual + 1] === ESTADO_CASILLA.CAMINO) { // Derecha
        movimiento = 1
      }else if (posicionActual % 20 !== 0 && posicionActual - 1 !== posicionAnterior && mapa[posicionActual - 1] === ESTADO_CASILLA.CAMINO) { // Izquierda
        movimiento = -1
      }else if (posicionActual < 380 && posicionActual + 20 !== posicionAnterior && mapa[posicionActual + 20] === ESTADO_CASILLA.CAMINO) { // Abajo
        movimiento = 20
      }else if (posicionActual > 19  && posicionActual - 20 !== posicionAnterior && mapa[posicionActual - 20] === ESTADO_CASILLA.CAMINO) { // Arriba
        movimiento = -20
      }else {
        caminoTerminado = true
      }
      posicionAnterior = posicionActual
      posicionActual = posicionActual + movimiento
    }    
    console.log("Camino encontrado", caminos.length, caminos)
    return caminos
  },[])

  const actualizarMapa = (index) => {
    console.log("Casilla seleccionada anteriormente:", casillaSeleccionada)
    console.log('click', index)

    const estadoCasillaMarcada = mapa[index]
    if (estadoCasillaMarcada === ESTADO_CASILLA.AGUA || mapa[index] === ESTADO_CASILLA.CAMINO ) return 
    const newMapa = [...mapa]
    if (estadoCasillaMarcada === ESTADO_CASILLA.SELECTED) {       
      setCasillaSeleccionada(null)
    }else{
      newMapa[index] = ESTADO_CASILLA.SELECTED
      setCasillaSeleccionada(index)
    }

    if (casillaSeleccionada !== null) {
      newMapa[casillaSeleccionada] = ESTADO_CASILLA.DEFAULT
    }

    setMapa(newMapa)
  }

  React.useEffect(() => {
    const controladorMovimientoRaton = (event) => {
      console.log('Moviendo mono', event.clientX, event.clientY)
      setPosition({x: event.clientX, y: event.clientY})
    }
    
    if (monoSeleccionado !== null) {
      window.addEventListener('pointermove', controladorMovimientoRaton)
    }
    
    // Cleanup function that runs when component unmounts or dependencies change
    return () => {
      window.removeEventListener('pointermove', controladorMovimientoRaton)
    }
  }, [monoSeleccionado]) // Only re-run effect if monoSeleccionado changes
  
  const agarrarMono = (tipoMono) => {
    console.log('Mono seleccionado:', tipoMono)
    
    if (monoSeleccionado === tipoMono) {
      setMonoSeleccionado(null)
    } else {
      setMonoSeleccionado(tipoMono)
    }
  }
  
  // Game loop
  React.useEffect(() => {
    
    const gameLoop = setInterval(() => {

      const currentGlobos = globosRef.current;
      const globosActualizados = [...currentGlobos];

      // Observamos todos los globos que hay en el mapa
      currentGlobos.forEach(globo => {

        const tiempoDeVida = globo.getTiempoDeVida()  // Número de ticks del juego que ha pasado el globo
        console.log("Globo en la posición", globo.getPosition(), "con tiempo de vida", tiempoDeVida, "y salud", globo.getHealth())
        
        if( tiempoDeVida >= camino.length) {
          // Comprobar si el jugador pierde vidas o pierde la partida
          if ( vidas <= globo.getHealth()) {    // Pierdes la partida
            console.log("Has perdido la partida")
            setVidas(0)
            setPerdido(true)
          }else{                                // No pierdes la partida todavía
            const nuevaVida = vidasRef.current - globo.getHealth()
            setVidas(nuevaVida) 
            // Eliminamos el globo del array de globos
            const index = globosActualizados.indexOf(globo);
            if (index > -1) {
              globosActualizados.splice(index, 1);
            }
          }

        }else{
          globo.setPosition( camino[tiempoDeVida] )     // Actualizamos la posición del globo en el mapa
          globo.addTiempoDeVida()
        }
      });

    // Si se cumple la condición --> Faltan glovos por aparecer en la ronda actual --> Lo hacemos aparecer
    if ( indexGloboRef.current < PARTIDA.rondas[rondaActual-1].length) {

      console.log("Globo nuevo", indexGloboRef.current, rondaActualRef.current)

      // Creamos el nuevo globo y lo añadimos al array de globos
      const health = PARTIDA.rondas[rondaActualRef.current-1][indexGloboRef.current]
      const globo = new GloboClass(indexGloboRef.current, camino[0], health, 0)
      globosActualizados.push(globo)
      const newIndexGlobo = indexGloboRef.current + 1
      setIndexGlobo(newIndexGlobo)
    } 

    // Actualizamos el estado de globos solo si hay cambios
    if (globosActualizados.length !== currentGlobos.length || 
      globosActualizados.some((g, i) => g !== currentGlobos[i])) {
      setGlobos(globosActualizados);
    }

    },1000)

    return () => perdido === true ? clearInterval(gameLoop) : null; // Si el jugador ha perdido, se detiene el juego 
  }, [])

  return (
    <>
      <BarraNavegacion>
        <BarraMonos
          monedas={monedas}
          vidas={vidas}
          >
          
          <Mono
            tipo={MONOS.basico.tipo}
            agarrarMono={() => agarrarMono(MONOS.basico.tipo)}
            sePuedeComprar={monedas >= MONOS.basico.precio}
            />
          <Mono
            tipo={MONOS.arco.tipo}
            agarrarMono={() => agarrarMono(MONOS.arco.tipo)}
            sePuedeComprar={monedas >= MONOS.arco.precio}
            />
          <Mono
            tipo={MONOS.fusil.tipo}
            agarrarMono={() => agarrarMono(MONOS.fusil.tipo)}
            sePuedeComprar={monedas >= MONOS.fusil.precio}
            />


        </BarraMonos>
      </BarraNavegacion>

      {monoSeleccionado !== null && (     // Si hay un mono seleccionado, muestra el mono agarrado
        <MonoAgarrado
          x={position.x}
          y={position.y}
          tipoMono={[monoSeleccionado]}
        />
        )}

      <div className="game-container">
        {mapa.map((estado, index) => {

          const globosEnCasilla = globos.filter(globo => globo.index === index);

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
    </>
  )
}

export default Juego