import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Menu } from './pages/Menu'
import Ranking from './pages/Ranking'
import Juego from './pages/Juego'
import Ajustes from './pages/Ajustes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App