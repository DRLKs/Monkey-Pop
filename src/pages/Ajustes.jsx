/**
 * Contenedor de los ajustes del menú principal.
 * 
 * Es formado por los componentes @see {@link BarraNavegacion}
 * y el componente @see {@link AjustesContainerAjustes}
 */

import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import '../styles/ajustes.css'

import AjustesContainerAjustes from '../components/AjustesContainerAjustes'
import { BarraNavegacion } from '../components/BarraNavegacion'

function Ajustes() {
  
  const navigate = useNavigate()
  
  const volver = () => {
    navigate('/');
  }

  return (
    <>
    <Helmet>
      <title>Monkey Pop - Ajustes</title>
      <html lang="es" />
    </Helmet>
    <div className="ajustes-page"></div> {/* Configuración de un div que actuará como body */}
    <BarraNavegacion funcionVolver={volver}/>
    <AjustesContainerAjustes/>    
    
    </>
  )
}

export default Ajustes