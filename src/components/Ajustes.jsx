import React, { useState, useEffect } from 'react'
import '../styles/ajustesJuego.css'
import { cargarConfiguracionSonido, guardarConfiguracionSonido } from '../utils/funciones'

function Ajustes({ visible, onClose }) {
  // Estados para manejar los valores de los ajustes
  const [configuracinAjustes] = useState(() => cargarConfiguracionSonido());
  const [volumen, setVolumen] = useState(configuracinAjustes.volumen);
  const [efectos, setEfectos] = useState(configuracinAjustes.efectos);

  const handleVolumenChange = (e) => {
    setVolumen(e.target.value);
  };

  const handleEfectosChange = (e) => {
    setEfectos(e.target.checked);
  };

  const guardarConfiguracion = () => {
    // Guardar valores actuales en localStorage
    guardarConfiguracionSonido(volumen, efectos);
    console.log(`Guardado: Volumen: ${volumen}, Efectos: ${efectos}`);
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
            <label htmlFor="volumen">Volumen de música</label>
            <input 
              type="range" 
              id="volumen" 
              min="0" 
              max="100" 
              value={volumen} 
              onChange={handleVolumenChange} 
            />
          </div>
          
          <div className="ajuste-item">
            <label htmlFor="efectos">Efectos de sonido</label>
            <div className="toggle-container">
              <input 
                type="checkbox" 
                id="efectos" 
                checked={efectos} 
                onChange={handleEfectosChange} 
              />
              <span className="toggle-label">{efectos ? 'Activado' : 'Desactivado'}</span>
            </div>
          </div>
          
        </div>
        
        <div className="ajustes-footer">
          <button className="btn-guardar" onClick={guardarConfiguracion}>Guardar</button>
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default Ajustes