import '../styles/ajustesMono.css';

import { MONOS } from '../utils/constantes'

function AjustesMono({mono, venderMono, cerrar, monedas, funcionMejorarMono}) {

  const precioVentaMono = MONOS[mono.getTipo()].precio / 2;

  const sePuedeComprar = monedas >= 50;

  return (
    <div className="ajustes-mono-container">
        <div className="presentacion-continer">
            <img src={MONOS[mono.getTipo()].imagen} alt={MONOS[mono.getTipo()].nombre} />
            <h1> { MONOS[mono.getTipo()].nombre } </h1>
        </div>
        <section className="estadisticas-container">
            <h2> Estadísticas </h2>
            <div className="estadistica-row">
              Rango: {mono.getRango()} 
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getRango() + mono.mejoraRango}</span>
              )}
            </div>

            <div className="estadistica-row">
              Daño: { mono.getDamage() }
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getDamage() + mono.mejoraDamage}</span>
              )}
            </div>

            <div className="estadistica-row">
              Recarga: { mono.getTiempoRecarga() }
              {mono.esMejorable() && (
                <span className="mejora-label"> → {mono.getTiempoRecarga() - mono.mejoraTiempoRecarga}</span>
              )}
            </div>
            
        </section>

        {mono.esMejorable() && (

            <button 
            className={`btn-mejora${!sePuedeComprar ? ' disabled' : ''}`} onClick={() => {mono.mejorarMono(), funcionMejorarMono(50);}}> Mejorar (-50🪙) </button>
            )}

        <div className="botones-container-cerrar-vender">
            
            <button className="btn" onClick={venderMono}> Vender (+{precioVentaMono}🪙) </button>
            <button className="btn" onClick={cerrar}> Cerrar </button>            
        </div>
    </div>
  );
}

export default AjustesMono;