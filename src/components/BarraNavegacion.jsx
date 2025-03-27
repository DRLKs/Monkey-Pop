
import { useNavigate } from 'react-router-dom'
import '../styles/barraNavegacion.css'

export function BarraNavegacion({ children }) {

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <button className="nav-button" id="back-button" onClick={() => navigate('/')}>Volver</button>
            {children}
        </div>
    )
}