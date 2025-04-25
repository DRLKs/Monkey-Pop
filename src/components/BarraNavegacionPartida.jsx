import React, { useState } from 'react';
// Constantes
import { MONOS } from "../utils/constantes";

// Componentes
import { BarraNavegacion } from "./BarraNavegacion";
import { BarraMonos } from "./BarraMonos";
import { MonoBarraNavegador } from "./MonoBarraNavegador";

// Imágenes de los botonos
import btnAjustes from '../assets/images/botones/btn-ajustes.png'
import btnReiniciar from '../assets/images/botones/btn-reiniciar.png'
import btnPausar from '../assets/images/botones/btn-pausa.png'
import btnReanudar from '../assets/images/botones/btn-play.png'
import btnRalentizar from '../assets/images/botones/btn-ralentizar.png'
import btnAcelerar from '../assets/images/botones/btn-acelerar.png'

function BarraNavegacionPartida( {ronda, vidas, monedas, pararReaunudar,  reiniciarJuego, abrirAjustes, agarrarMono} ){

    const [pausado, setPausado] = useState(false)

    const pausarReaunudar = () => {
      setPausado(!pausado)
      pararReaunudar()
    }

    return(
        <BarraNavegacion>
            <div className='botones-container'>
              <div className="boton-barraNavegacion">
                <img 
                  src={btnRalentizar} 
                  alt="Ralentizar" 
                  className="icono-boton" 
                />
              </div>
              <div className="boton-barraNavegacion">
                <img 
                  src={btnAcelerar} 
                  alt="Acelerar" 
                  className="icono-boton" 
                />
              </div>
              <div className="boton-barraNavegacion">
                <img 
                  src={btnAjustes} 
                  alt="Ajustes" 
                  className="icono-boton" 
                  onClick={abrirAjustes} 
                />
              </div>
              <div className="boton-barraNavegacion">
                <img 
                  src={btnReiniciar} 
                  alt="Reiniciar" 
                  className="icono-boton" 
                  onClick={reiniciarJuego} 
                  />
                </div>
                <div className="boton-barraNavegacion">
                  <img 
                  src={pausado ? btnReanudar : btnPausar}
                  alt="Pausar/Reanudar" 
                  className="icono-boton" 
                  onClick={ pausarReaunudar } 
                />
                </div>
            </div>
           
    
            <div className="info-ronda">
              <h2>Ronda: {ronda}</h2>
            </div>
    
            <BarraMonos
              monedas={monedas}
              vidas={vidas}
              >
              { /* Arrglar esto para no poner todos los monos manualmente */ }
              <MonoBarraNavegador
                tipo={MONOS.basico.tipo}
                agarrarMono={() => agarrarMono(MONOS.basico.tipo)}
                sePuedeComprar={monedas >= MONOS.basico.precio}
                />
              <MonoBarraNavegador
                tipo={MONOS.arco.tipo}
                agarrarMono={() => agarrarMono(MONOS.arco.tipo)}
                sePuedeComprar={monedas >= MONOS.arco.precio}
                />
              <MonoBarraNavegador
                tipo={MONOS.fusil.tipo}
                agarrarMono={() => agarrarMono(MONOS.fusil.tipo)}
                sePuedeComprar={monedas >= MONOS.fusil.precio}
                />
              <MonoBarraNavegador
                tipo={MONOS.artificiero.tipo}
                agarrarMono={() => agarrarMono(MONOS.artificiero.tipo)}
                sePuedeComprar={monedas >= MONOS.artificiero.precio}
                />
              <MonoBarraNavegador
                tipo={MONOS.francotirador.tipo}
                agarrarMono={() => agarrarMono(MONOS.francotirador.tipo)}
                sePuedeComprar={monedas >= MONOS.francotirador.precio}
                />
              <MonoBarraNavegador
                tipo={MONOS.laser.tipo}
                agarrarMono={() => agarrarMono(MONOS.laser.tipo)}
                sePuedeComprar={monedas >= MONOS.laser.precio}
                />
    
    
            </BarraMonos>
          </BarraNavegacion>

          
    )
}

export default BarraNavegacionPartida;