// Bibliotecas de React
import React from 'react'
import { useState, useEffect } from 'react'

// Componentes
import { BarraNavegacion } from '../components/BarraNavegacion'
import { CasillaMapa } from '../components/CasillaMapa'
import { BarraMonos } from '../components/BarraMonos'
import { Mono } from '../components/Mono'
import MonoAgarrado from '../components/MonoAgarrado'

// Utilidades
import { mapas } from '../utils/mapas'
import { ESTADO_CASILLA, MONOS } from '../utils/constantes'

// Estilos
import '../styles/juego.css'

function Juego() {
  
  const [mapa, setMapa] = useState( mapas.lago)                          // Estado con la forma del mapa, inicializamos el mapa que queramos jugar
  const [monedas, setMonedas] = useState(170)                           // Estado con la cantidad de monedas que tiene el jugador
  const [vidas, setVidas] = useState(150)                                // Estado con la cantidad de vidas que tiene el jugador
  
  const [monoSeleccionado, setMonoSeleccionado] = useState(null)         // Estado con el mono seleccionado
  const [position, setPosition] = useState({x: 0, y:0})                  // Estado con la posición del ratón, para que le siga el mono seleccionado

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
          return (
            <CasillaMapa 
              key={index} 
              estado={estado}
              index={index}
              actualizarMapa={() => actualizarMapa(index)} 
              />
          )
        })}
      </div>
    </>
  )
}

export default Juego