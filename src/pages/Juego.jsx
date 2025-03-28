// Bibliotecas de React
import React, { useMemo } from 'react'
import { useState } from 'react'

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion'
import { CasillaMapa } from '../components/CasillaMapa'
import { BarraMonos } from '../components/BarraMonos'
import { Mono } from '../components/Mono'
import MonoAgarrado from '../components/MonoAgarrado'
import Globo from '../components/Globo'

// Clases
import { Globo as GloboClass } from '../utils/clases'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MONOS, PARTIDA } from '../utils/constantes'

// Estilos
import '../styles/juego.css'

function Juego() {
  
  const [mapa, setMapa] = useState( mapas.diagonal)                     // Estado con la forma del mapa, inicializamos el mapa que queramos jugar
  const [monedas, setMonedas] = useState(170)                           // Estado con la cantidad de monedas que tiene el jugador
  const [vidas, setVidas] = useState(150)                               // Estado con la cantidad de vidas que tiene el jugador
  const [rondaActual, setRonda] = useState(1)                           // Estado con la ronda actual del juego
  
  const [globos, setGlobos] = useState([])                              // Estado con los globos que aparecen en el mapa
  const [monoSeleccionado, setMonoSeleccionado] = useState(null)        // Estado con el mono seleccionado
  const [position, setPosition] = useState({x: 0, y:0})                 // Estado con la posición del ratón, para que le siga el mono seleccionado

  const[casillaSeleccionada, setCasillaSeleccionada] = useState(null)   // Estado con el índice de la casilla seleccionada

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
     
  // Función para obtener el array de caminos, para que los globos la puedan recorrer
  const camino = useMemo(() => {
    const caminos = []
    let posicionAnterior
    let posicionActual

    // Buscamos nuestra posición inicial, que es la primera casilla de camino
    // El camino siempre empieza a la izquierda
    for (let i = 0; i < mapa.length; i = i + 20) {
      if (mapa[i] === ESTADO_CASILLA.CAMINO) {
        posicionActual = i
        posicionAnterior = i - 1
        caminos.push(posicionActual)
        break
      }
    }

    let caminoTerminado = false
    let movimiento
    // Buscamos el camino, que es la casilla de camino, y lo guardamos en el array caminos
    while( caminoTerminado === false)  {  
      movimiento = 0
      // Buscamos la siguiente casilla de camino, que es la que está a la derecha, abajo o arriba de la casilla actual
      if ( posicionActual % 19 !== 0 && posicionActual + 1 !== posicionAnterior && mapa[posicionActual + 1] === ESTADO_CASILLA.CAMINO) { // Derecha
        movimiento = 1
      }else if (posicionActual % 20 !== 0 && posicionActual - 1 !== posicionAnterior && mapa[posicionActual - 1] === ESTADO_CASILLA.CAMINO) { // Izquierda
        movimiento = -1
      }else if (posicionActual < 20 && posicionActual + 20 !== posicionAnterior && mapa[posicionActual + 20] === ESTADO_CASILLA.CAMINO) { // Abajo
        movimiento = 20
      }else if (posicionActual > 379 && posicionActual - 20 !== posicionAnterior && mapa[posicionActual - 20] === ESTADO_CASILLA.CAMINO) { // Arriba
        movimiento = -20
      }else {
        caminoTerminado = true
      }
      posicionAnterior = posicionActual
      posicionActual = posicionActual + movimiento

    }    
    return caminos
  },[])
  
  // Función que controla los globos
  React.useEffect(() => {
    
    for (let idx in PARTIDA.rondas) {

      const globo = new GloboClass(idx, camino[0], PARTIDA.rondas[rondaActual-1][idx])

      // Agregamos el globo al estado de globos
      setGlobos(prevGlobos => [...prevGlobos, globo])
    }
    
  },[globos])
  


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