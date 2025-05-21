import React from 'react'
import { Helmet } from 'react-helmet'

import '../styles/ajustes.css'

import AjustesContainerAjustes from '../components/AjustesContainerAjustes'
import { BarraNavegacion } from '../components/BarraNavegacion'

function Ajustes() {
  
  return (
    <>
    <Helmet>
      <title>Monkey Pop - Ajustes</title>
    </Helmet>
    <div className="ajustes-page"></div> {/* Configuración de un div que actuará como body */}
    <BarraNavegacion />
    <AjustesContainerAjustes/>    
    
    </>
  )
}

export default Ajustes