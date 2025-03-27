import { MONOS } from "../utils/constantes";

import '../styles/monoAgarrado.css';

function MonoAgarrado({ x, y, tipoMono }) {

  const radio = MONOS[tipoMono].rango / 2;

  return (
    <div className="circuloMonoAgarrado" style={{
        width: `${MONOS[tipoMono].rango}px`,
        height: `${MONOS[tipoMono].rango}px`,
        transform: `translate(${x - radio}px, ${y - radio}px)`
      }}>
        <img className="imagenMonoAgarrado" src={MONOS[tipoMono].imagen } alt={`Mono ${tipoMono}`}
            />
    </div>
  );
}

export default MonoAgarrado;