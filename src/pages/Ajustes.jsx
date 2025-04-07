import React from 'react'

import '../styles/ajustes.css'

import AjustesContainerAjustes from '../components/AjustesContainerAjustes'
import { BarraNavegacion } from '../components/BarraNavegacion'

function Ajustes() {
  
  return (
    <>
    <div className="ajustes-page"></div> {/* Configuración de un div que actuará como body */}
    <BarraNavegacion />
    <AjustesContainerAjustes/>    
    
    </>
  )
}

export default Ajustes