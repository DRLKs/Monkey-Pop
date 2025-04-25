import '../styles/ajustesMono.css';

import { MONOS } from '../utils/constantes'

function AjustesMono({mono, venderMono, cerrar, funcionMejorarMono}) {

  const precioVentaMono = MONOS[mono.getTipo()].precio / 2;

  return (
    <div className="ajustes-mono-container">
        <div className="presentacion-continer">
            <img src={MONOS[mono.getTipo()].imagen} alt={MONOS[mono.getTipo()].nombre} />
            <h1> { MONOS[mono.getTipo()].nombre } </h1>
        </div>
        <div className="estadisticas-container">
            <h2> Estadísticas </h2>
            <div className="estadistica-row">
              Rango: {mono.getRango()} 
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getRango() + 12}</span>
              )}
            </div>

            <div className="estadistica-row">
              Daño: { mono.getDamage() }
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getDamage() + 12}</span>
              )}
            </div>

            <div className="estadistica-row">
              Recarga: { mono.getTiempoRecarga() }
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getTiempoRecarga() + 12}</span>
              )}
            </div>
            
        </div>

        {mono.esMejorable() && (
            <button className="btn-mejora" onClick={() => {mono.mejorarMono(), funcionMejorarMono(50);}}> Mejorar </button>
            )}

        <div className="botones-container-cerrar-vender">
            
            <button className="btn" onClick={cerrar}> Cerrar </button>
            <button className="btn" onClick={venderMono}> Vender {precioVentaMono} </button>
        </div>
    </div>
  );
}

export default AjustesMono;