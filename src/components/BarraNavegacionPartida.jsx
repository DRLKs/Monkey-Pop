
// Constantes
import { MONOS } from "../utils/constantes";

// Componentes
import { BarraNavegacion } from "./BarraNavegacion";
import { BarraMonos } from "./BarraMonos";
import { MonoBarraNavegador } from "./MonoBarraNavegador";

// Imágenes de los botonos
import btnAjustes from '../assets/images/botones/btn-ajustes.png'
import btnReiniciar from '../assets/images/botones/btn-reiniciar.png'

function BarraNavegacionPartida( {ronda, vidas, monedas, reiniciarJuego, abrirAjustes, agarrarMono} ){
    return(
        <BarraNavegacion>
            <div className='botones-container'>
              <div className="ajustes">
                <img 
                  src={btnAjustes} 
                  alt="Ajustes" 
                  className="icono-boton" 
                  onClick={abrirAjustes} 
                />
              </div>
              <div className="reiniciar">
                <img 
                  src={btnReiniciar} 
                  alt="Reiniciar" 
                  className="icono-boton" 
                  onClick={reiniciarJuego} 
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
    
    
            </BarraMonos>
          </BarraNavegacion>
    )
}

export default BarraNavegacionPartida;