
import { MONOS } from "../utils/constantes";

import animacionDisparo from '../assets/images/animaciones/disparo.webp'

const MonoMapa = ( {mono, seleccionado} ) => {

    const mono_img = MONOS[mono.tipo].imagen; // Obtener la imagen del mono según su tipo
    const mono_img_disparando = MONOS[mono.tipo].imagen_disparando; // Obtener la imagen del mono disparando según su tipo


    // Si el mono está mejorado, añade una clase extra
    const claseMejorado = mono.nivel > 1 ? 'mono-mejorado' : '';
    // Si el mono está seleccionado, añade una clase extra
    const claseSeleccionado = seleccionado ? 'mono-seleccionado' : '';

    return (
    <div className={`mono-mapa ${claseMejorado} ${claseSeleccionado}`}>
     
      
      {mono.puedeAtacar() && <img src={animacionDisparo} alt="disparo" className="disparo" />    }

      <img src={mono_img} alt={`Mono${mono.tipo}`} className="mono" />
    </div>
  );
}

export default MonoMapa;