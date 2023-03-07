import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './Pages/Landingpage';
import Loginpage from './Pages/Loginpage';
import "./Style/Landingpage.css"
import "./Style/Loginpage.css"
import Navbarpage from './Pages/Navbarpage';
import Berandapage from './Pages/Berandapage';
import confirmpage from './Pages/confirmpage';
import "./Style/ListMenupage.css"
import "./Style/confirmpage.css"



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/Loginpage' element={<Loginpage />} />
        <Route path='/Navbarpage' element={<Navbarpage />} />
        <Route path='/Berandapage' element={<Berandapage />} />
        <Route path='/ListMenu' element={<ListMenupage />} />
        <Route path='/KonfimasiPemesanan' element={<confirmpage />} />      
      </Routes>
    </Router>
  )
}

export default App;
