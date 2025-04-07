
import { BarraNavegacion } from '../components/BarraNavegacion'

import '../styles/creditos.css'

function Creditos(){

    return (

        <>
        <div className='fondo-creditos'></div>
        <BarraNavegacion>

        </BarraNavegacion>
        <div className='creditos-container'>
            <h1> Developers </h1>
            <p>
            David, Suito, Fran, Soraya, Marquito
            </p>
        </div>
        </>

    )
}

export default Creditos