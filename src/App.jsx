import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Menu } from './pages/Menu'
import Ranking from './pages/Ranking'
import Juego from './pages/Juego'
import Ajustes from './pages/Ajustes'
import Tutorial from './pages/Tutorial'
import Creditos from './pages/Creditos'
import MonoInfo from './pages/MonoInfo.'
import UIContext from './context/UIContext'
function App() {
  return (
    <BrowserRouter>
      <UIContext>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/tutorial" element={<Tutorial/>} />
          <Route path="/creditos" element={<Creditos/>} />
          <Route path="/monoInfo" element={<MonoInfo/>} />
        </Routes>
      </UIContext>
    </BrowserRouter>

  )
}

export default App