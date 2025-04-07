
import { MONOS } from "../utils/constantes";

const MonoMapa = (tipo) => {

    const mono_img = MONOS[tipo.tipo].imagen; // Obtener la imagen del mono según su tipo

  return (
    <div className="mono-mapa">
          <img src={mono_img} alt={`Mono${tipo}`} className="mono" />
    </div>
  );
}

export default MonoMapa;