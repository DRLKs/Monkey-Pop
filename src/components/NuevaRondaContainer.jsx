
import '../styles/nuevaRondaContainter.css'

function NuevaRondaContainer({visible, ronda}){

    if ( !visible ) return null;

    return (
        <div className="nueva-ronda-overlay">
            <div className="nueva-ronda-container">
                <div className='nueva-ronda-msg'>
                    {`Comienza la ronda ${ronda}`}
                </div>
            </div>
        </div>
    )
    
}

export default NuevaRondaContainer;