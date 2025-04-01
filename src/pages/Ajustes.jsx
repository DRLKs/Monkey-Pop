import React from 'react'

import '../styles/ajustes.css'

import { ContainerControles } from '../components/containerControles'
import { BarraNavegacion } from '../components/BarraNavegacion'

function Ajustes() {
  
  return (
    <>
    <div className="ajustes-page"></div> {/* Configuración de un div que actuará como body */}
    <BarraNavegacion />
    <ContainerControles/>    
    
    </>
  )
}

export default Ajustes