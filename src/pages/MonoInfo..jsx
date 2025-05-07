import React, { useState } from "react";

import { BarraNavegacion } from '../components/BarraNavegacion';
import AjustesMono from "../components/AjustesMono";
import { MONOS } from "../utils/constantes";

import '../styles/infoMonos.css';

function MonoInfo() {
    const [verAjustesMono, setVerAjustesMono] = useState(null);

    const cerrarAjustes = () => {
        setVerAjustesMono(null);
    };

    return (
        <div className="pagina-mono-info">
            <BarraNavegacion />
            <div className="contenedor-monos">
                {Object.values(MONOS).map((mono) => (
                    <div 
                        key={mono.tipo || mono.id}
                        className="tarjeta-mono"
                    >
                        <img src={mono.imagen} alt={mono.nombre} className="imagen-mono" />
                        
                        <div className="info-texto-mono">
                            <h3>{mono.nombre}</h3>
                            <p><strong>Precio:</strong> ${mono.precio}</p>
                            <p><strong>Rango:</strong> {mono.rango}</p>
                            <p><strong>Velocidad:</strong> {mono.tiempoRecarga}s</p>
                            <p><strong>Daño:</strong> {mono.damage}</p>
                            <p className="descripcion-mono">{mono.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>

            {verAjustesMono !== null && (
                <AjustesMono
                    mono={verAjustesMono} 
                    tipo={verAjustesMono.tipo}
                    venderMono={() => {
                        console.log("Vender mono no aplica en la página de información general");
                    }}
                    cerrar={cerrarAjustes}
                />
            )}
        </div>
    );
}

export default MonoInfo;