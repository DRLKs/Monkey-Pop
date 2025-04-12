import { MONOS } from "../utils/constantes";

import '../styles/ajustesMono.css';

function AjustesMono({mono, venderMono, cerrar}) {
  return (
    <div className="ajustes-mono-container">
        <div className="presentacion-continer">
            <img src={MONOS[mono.getTipo()].imagen} alt={MONOS[mono.getTipo()].nombre} />
            <h1> { MONOS[mono.getTipo()].nombre } </h1>
        </div>
        <div className="estadisticas-container">
            <h2> Estadísticas </h2>
            <div className="estadistica-row">
              <p> Rango: { mono.getRango() } </p>
              <button 
                className="btn-mejorar-small" 
                onClick={() => mono.mejorarRango()}
              >
                +
              </button>
            </div>
            <div className="estadistica-row">
              <p> Daño: { mono.getDamage() } </p>
              <button 
                className="btn-mejorar-small" 
                onClick={() => mono.mejorarDamage()}
              >
                +
              </button>
            </div>
            <div className="estadistica-row">
              <p> Tiempo de recarga: { mono.getTiempoRecarga() } </p>
              <button 
                className="btn-mejorar-small" 
                onClick={() => mono.mejorarTiempoRecarga()}
              >
                +
              </button>
            </div>
        </div>
        <div className="botones-container">
            <button className="btn" onClick={cerrar}> Cerrar </button>
            <button className="btn" onClick={venderMono}> Vender </button>
        </div>
    </div>
  );
}

export default AjustesMono;