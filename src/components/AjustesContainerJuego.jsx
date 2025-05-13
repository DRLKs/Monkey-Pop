import React, { useState, useEffect } from 'react'
import '../styles/ajustesJuego.css'
import { cargarConfiguracion, guardarConfiguracion } from '../utils/funciones'

// Botones silenciado/desilenciado
import silenciado from '../assets/images/botones/silenciado.webp';
import desilenciado from '../assets/images/botones/desilenciado.webp';


function AjustesContainerJuego({ visible, onClose }) {
  // Estados para manejar los valores de los ajustes
  const [configuracinAjustes] = useState(() => cargarConfiguracion());
  const [volumen, setVolumen] = useState(configuracinAjustes.volumen);
  const [efectos, setEfectos] = useState(configuracinAjustes.efectos);

  const handleVolumenChange = (e) => {
    setVolumen(e.target.value);
  };

  const handleEfectosChange = (e) => {
    setEfectos(e.target.checked);
  };

  const guardar = () => {
    // Guardar valores actuales en localStorage
    guardarConfiguracion(volumen, efectos);
    console.log(`Guardado: Volumen: ${volumen}, Efectos: ${efectos}`);

    // Emitir evento personalizado para notificar a UIContext
    const evento = new CustomEvent('configuracionActualizada', {
      detail: { volumen, efectos }
    });
    window.dispatchEvent(evento);

    onClose();
  };
  
  // Manejar clic en el overlay
  // Si se clica fuera del contenedor de ajustes, se cierra este
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div className="ajustes-overlay" onClick={handleOverlayClick}>
      <div className="ajustes-contenedor">
        <div className="ajustes-header">
          <h2>Ajustes</h2>
        </div>
        
        <div className="ajustes-body">
          <div className="ajuste-item">
            <label htmlFor="volumen">Volumen</label>
            <input 
              type="range" 
              id="volumen" 
              min="0" 
              max="100" 
              value={volumen} 
              onChange={handleVolumenChange} 
            />
          </div>
          
          <div className="toggle-container">
                                  <button 
                                      type="button"
                                      id="efectos" 
                                      className="boton-sonido"
                                      onClick={() => setEfectos(!efectos)}
                                  >
                                      <img 
                                          src={efectos ? desilenciado : silenciado} 
                                          alt={efectos ? "Sonido activado" : "Sonido silenciado"} 
                                          className="icono-sonido"
                                      />
                                  </button>
                              </div>
          
        </div>
        
        <div className="ajustes-footer">
          <button className="btn-guardar" onClick={guardar}>Guardar</button>
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default AjustesContainerJuego