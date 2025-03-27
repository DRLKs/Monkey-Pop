
import monedaImagen from '../assets/images/moneda.png'

export function BarraMonos({ monedas, vidas, children }) {

    return (
        <div className="monkey-container">
            <div className='info-container'>
                <div className="monedas-container">
                    <img src= {monedaImagen} alt="Monedas" className="monedas" />
                    <span className="moneda-count">{monedas}</span>
                </div>
                <div className="vidas-container">
                <h3 className="vidas"> ❤️ </h3>
                <span className="vidas-count">{vidas}</span>
                </div>
            </div>
            
            {children}
            
        </div>
    )
}