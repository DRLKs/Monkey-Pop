import { useState, useEffect } from 'react';
import { cargarConfiguracion, guardarConfiguracion } from '../utils/funciones';

function AjustesContainerAjustes() {
    
    // Cargar configuración inicial
    const [configuracionAjustes] = useState(() => cargarConfiguracion());
    const [volumen, setVolumen] = useState(configuracionAjustes.volumen || 50);
    const [efectos, setEfectos] = useState(configuracionAjustes.efectos === null ? true : configuracionAjustes.efectos);
    const [lenguaje, setLenguaje] = useState(configuracionAjustes.lenguaje || "es");
    
    const handleVolumenChange = (e) => {
        setVolumen(e.target.value);
    };
    
    const handleEfectosChange = (e) => {
        setEfectos(e.target.checked);
    };

    const handleLenguajeChange = (e) => {
        setLenguaje(e.target.value);
    };
    
    const guardar = (e) => {
        // Prevenir comportamiento predeterminado del formulario
        e.preventDefault();
        
        // Guardar valores actuales en localStorage
        guardarConfiguracion(volumen, efectos, lenguaje);
        console.log(`Guardado: Volumen: ${volumen}, Efectos: ${efectos}, Lenguaje: ${lenguaje}`);
        
    };

    return (
        <div id="container-controles">
            <h1> AJUSTES </h1>

            <form id="controlForm" onSubmit={guardar}>
                <div id="control-volumen">
                    <label htmlFor="volumen">Volumen: </label>
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

                <div id="control-lenguaje">
                    <label htmlFor="lenguaje">Lenguaje: </label>
                    <select 
                        id="lenguaje" 
                        name="lenguaje" 
                        value={lenguaje}
                        onChange={handleLenguajeChange}
                    >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                    </select>
                </div>

                <button id="boton-submit" type="submit">Guardar Ajustes</button>
            </form>
        </div>
    );
}

export default AjustesContainerAjustes;