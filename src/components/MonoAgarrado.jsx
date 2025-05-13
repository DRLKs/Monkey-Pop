import { MONOS } from "../utils/constantes";

// Componentes
import CirculoRango from "./CirculoRango";

function MonoAgarrado({ x, y, tipoMono }) {
  // Aseguramos que las coordenadas sean números válidos, de lo contrario usamos valores predeterminados
  const posX = isNaN(x) ? 0 : x;
  const posY = isNaN(y) ? 0 : y;

  return (
    <CirculoRango x={posX} y={posY} rango={MONOS[tipoMono].rango} >
      <img 
        className="imagenMonoAgarrado" 
        src={MONOS[tipoMono].imagen} 
        alt={`Mono ${tipoMono}`}
        draggable="false"
      />
    </CirculoRango>
  );
}

export default MonoAgarrado;