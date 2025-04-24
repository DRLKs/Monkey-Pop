import { MONOS } from "../utils/constantes";

// Componentes
import CirculoRango from "./CirculoRango";

function MonoAgarrado({ x, y, tipoMono }) {

  return (
    <CirculoRango x={x} y={y} rango={MONOS[tipoMono].rango} >
      <img className="imagenMonoAgarrado" src={MONOS[tipoMono].imagen } alt={`Mono ${tipoMono}`}/>
    </CirculoRango>
  );
}

export default MonoAgarrado;