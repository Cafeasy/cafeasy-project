import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Landingpage from './Pages/Landingpage';
import Loginpage from './Pages/Loginpage';
import "./Style/Landingpage.css"
import "./Style/Loginpage.css"
import Navbarpage from './Pages/Navbarpage';
import Berandapage from './Pages/Berandapage';
import ListMenupage from './Pages/ListMenupage';
import Confirmpage from './Pages/Confirmpage';
import Methodpage from './Pages/Methodpage';
import "./Style/ListMenupage.css"
import "./Style/Confirmpage.css";
import "./Style/Methodpage.css";




function App() {

  return (
    <Router>
      <Routes>
      <Route exact path='/' element={ <Landingpage />} />
        <Route exact path='/Loginpage' element={ <Loginpage />} />
        <Route exact path='/Navbarpage' element={<Navbarpage />} />
        <Route  exact path='/Berandapage' element={ <Berandapage /> } />
        <Route exact path='/ListMenu' element={<ListMenupage />} />
        <Route exact path='/KonfimasiPesanan' element={ <Confirmpage />} />
        <Route exact path='/MetodePembayaran' element={<Methodpage />} />
      </Routes>
    </Router>
  )
}

export default App;
