import React, { useState } from 'react';
// Constantes
import { MONOS } from "../utils/constantes";

// Componentes
import { BarraNavegacion } from "./BarraNavegacion";
import { BarraMonos } from "./BarraMonos";
import { MonoBarraNavegador } from "./MonoBarraNavegador";

function BarraNavegacionPartida( {vidas, monedas, agarrarMono, informacion} ){

    return(
        <BarraNavegacion>
            
            <aside className="info-tutorial">
              {informacion}
            </aside>
    
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