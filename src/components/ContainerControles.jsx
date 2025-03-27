

export function ContainerControles() {
    
    return (
        <div id="container-controles">

            <h1> AJUSTES </h1>

            <form id="controlForm">
                <div id="control-volumen">
                    <label htmlFor="volumen">Volumen: </label>
                    <input type="range" id="volumen" name="volumen" min="0" max="100" />
                </div>

                <div id="control-lenguaje">
                    <label htmlFor="lenguaje">Lenguaje: </label>
                    <select id="lenguaje" name="lenguaje">
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                        <option value="fr">Francés</option>
                        <option value="de">Alemán</option>
                    </select>
                </div>

                <button id="boton-submit" type="submit">Guardar Ajustes</button>
            </form>
        </div>
    )
}