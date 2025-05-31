
import '../styles/barraNavegacion.css'

export function BarraNavegacion({ funcionVolver, children }) {

    return (
        <nav className="navbar">
            <button className="nav-button" id="back-button" onClick={funcionVolver}>Volver</button>
            {children}
        </nav>
    )
}