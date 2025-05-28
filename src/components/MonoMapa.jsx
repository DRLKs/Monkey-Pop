
import { MONOS } from "../utils/constantes";

import animacionDisparo from '../assets/images/animaciones/disparo.webp'

const MonoMapa = ( {mono} ) => {

    const mono_img = MONOS[mono.tipo].imagen; // Obtener la imagen del mono según su tipo
    const mono_img_disparando = MONOS[mono.tipo].imagen_disparando; // Obtener la imagen del mono disparando según su tipo

  return (
    <div className="mono-mapa">
      
      {/*
      {mono.puedeAtacar() ?
        <img src={mono_img_disparando} alt={`Mono ${mono.tipo} disparando`} className="mono" />
        :
          <img src={mono_img} alt={`Mono${mono.tipo}`} className="mono" />
      }
      */}
      {mono.puedeAtacar() && <img src={animacionDisparo} alt="disparo" className="disparo" />    }

      <img src={mono_img} alt={`Mono${mono.tipo}`} className="mono" />
    </div>
  );
}

export default MonoMapa;