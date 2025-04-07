import React, {useState} from "react";

import { BarraNavegacion } from '../components/BarraNavegacion'
import AjustesMono from "../components/AjustesMono";
import { MONOS } from "../utils/constantes"; //para importart los monos


import '../styles/infoMonos.css'

function MonoInfo() {
    const [verAjustesMono, setVerAjustesMono] = useState(null);
  
    const abrirAjustes = (mono) => {
      setVerAjustesMono(mono);
    };
  
    const cerrarAjustes = () => {
      setVerAjustesMono(null);
    };
  
    return (
        <div className="pagina-mono-info">
          <BarraNavegacion />
          <div className="contenedor-monos">
            {Object.values(MONOS).map((mono) => (
              <div key={mono.tipo} className="tarjeta-mono">
                <img src={mono.imagen} alt={mono.nombre} className="imagen-mono" />
                <h3>{mono.nombre}</h3>
                <p><strong>Precio:</strong> ${mono.precio}</p>
                <p><strong>Rango:</strong> {mono.rango}</p>
                <p><strong>Velocidad:</strong> {mono.tiempoRecarga}s</p>
                <p><strong>Daño:</strong> {mono.damage}</p>
                <p>{mono.descripcion}</p>
              </div>
            ))}
          </div>
    
          {verAjustesMono !== null && (
            <AjustesMono
              tipo={verAjustesMono.tipo}
              venderMono={() => console.log("Vender mono no aplica aquí")}
              cerrar={cerrarAjustes}
            />
          )}
        </div>
      );
    }
    
    export default MonoInfo;