import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Menu } from './pages/Menu'
import Ranking from './pages/Ranking'
import Juego from './pages/Juego'
import Ajustes from './pages/Ajustes'
import Tutorial from './pages/Tutorial'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/tutorial" element={<Tutorial/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App