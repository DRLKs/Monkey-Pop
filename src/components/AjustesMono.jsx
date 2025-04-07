
import { MONOS } from "../utils/constantes";

import '../styles/ajustesMono.css';

function AjustesMono({tipo, venderMono, cerrar}) {
  return (
    <div className="ajustes-mono-container">
        <div className="presentacion-continer">
            <img src={MONOS[tipo].imagen} alt={MONOS[tipo].nombre} />
            <h1> { MONOS[tipo].nombre } </h1>
        </div>
        <div className="estadisticas-container">
            <h2> Estadísticas </h2>
            <p> Precio: { MONOS[tipo].precio } </p>
            <p> Rango: { MONOS[tipo].rango } </p>
            <p> Daño: { MONOS[tipo].damage } </p>
            <p> Tiempo de recarga: { MONOS[tipo].tiempoRecarga } </p>
            <p> Descripción: { MONOS[tipo].descripcion } </p>
        </div>
        <div className="botones-container">
            <button className="btn-cerrar" onClick={cerrar}> Cerrar </button>
            <button className="btn-vender" onClick={venderMono}> Vender </button>
        </div>
    </div>
  );
}

export default AjustesMono;