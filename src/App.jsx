import { HashRouter, Routes, Route } from 'react-router-dom'

import { Menu } from './pages/Menu'
import Ranking from './pages/Ranking'
import Juego from './pages/Juego'
import Ajustes from './pages/Ajustes'
import Tutorial from './pages/Tutorial'
import Creditos from './pages/Creditos'
import MonoInfo from './pages/MonoInfo'
import InfoJuego from './pages/InfoJuego'
import AccesibilidadPanel from './pages/AccesibilidadPanel'
import { UIProvider } from './context/UIContext'
import ColorBlindFilter from './components/accesibilidad/ColorBlindFilter'

function App() {  return (
    <HashRouter>
      <UIProvider>
        <ColorBlindFilter />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="juego" element={<Juego />} />          <Route path="ajustes" element={<Ajustes />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="tutorial" element={<Tutorial/>} />
          <Route path="creditos" element={<Creditos/>} />
          <Route path="monoInfo" element={<MonoInfo/>} />
          <Route path="infoJuego" element={<InfoJuego/>} />
          <Route path='accesibilidad' element={<AccesibilidadPanel/>} />
        </Routes>
      </UIProvider>
    </HashRouter>

  )
}

export default App