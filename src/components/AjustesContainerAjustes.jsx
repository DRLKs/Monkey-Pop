import { useState, useEffect } from 'react';
import { cargarConfiguracion, guardarConfiguracion } from '../utils/funciones';

// Botones silenciado/desilenciado
import silenciado from '../assets/images/botones/silenciado.webp';
import desilenciado from '../assets/images/botones/desilenciado.webp';

// Importamos los estilos del botón de sonido
import '../styles/botonSonido.css';


function AjustesContainerAjustes() {

    // Cargar configuración inicial
    const [configuracionAjustes] = useState(() => cargarConfiguracion());
    const [volumen, setVolumen] = useState(configuracionAjustes.volumen || 50);
    const [efectos, setEfectos] = useState(configuracionAjustes.efectos === null ? true : configuracionAjustes.efectos);
    const [lenguaje, setLenguaje] = useState(configuracionAjustes.lenguaje || "es");

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [configuracionGuardada, setConfiguracionGuardada] = useState(false);

    const handleVolumenChange = (e) => {
        setVolumen(e.target.value);
    };

    const handleEfectosChange = (e) => {
        setEfectos(e.target.checked);
    };

    const handleLenguajeChange = (e) => {
        setLenguaje(e.target.value);
    };

    /**
     * Función que guarda la configuración actual en localStorage y emite un evento personalizado.
     */
    const guardar = (e) => {
        // Prevenir comportamiento predeterminado del formulario
        e.preventDefault();

        // Guardar valores actuales en localStorage
        guardarConfiguracion(volumen, efectos, lenguaje);
        const confGuardada = configuracionGuardada;
        setConfiguracionGuardada(!confGuardada);
    };

    // Efecto que reacciona al cambio de estado
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        console.log("Configuración guardada correctamente");
        console.log(`Guardado: Volumen: ${volumen}, Efectos: ${efectos}, Lenguaje: ${lenguaje}`);
        setConfiguracionGuardada(true);

        // Emitir evento personalizado para notificar a UIContext
        const evento = new CustomEvent('configuracionActualizada', {
            detail: { volumen, efectos }
        });
        window.dispatchEvent(evento);

    }, [configuracionGuardada]);

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

                <div className="toggle-container">
                    <label htmlFor="mute on/off">Mute on/off: </label>
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

                <div id="control-lenguaje">
                    <label htmlFor="lenguaje">Idioma: </label>
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

                {configuracionGuardada && (
                    <div id='mensaje-guardado-correctamente'>
                        <label> Guardado correctamente </label>
                    </div>
                )}
            </form>
        </div>
    );
}

export default AjustesContainerAjustes;