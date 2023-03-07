import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './Pages/Landingpage';
import Loginpage from './Pages/Loginpage';
import ListMenupage from './Pages/ListMenupage';
import "./Style/Landingpage.css"
import "./Style/Loginpage.css"
import "./Style/ListMenupage.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/Loginpage' element={<Loginpage />} />
        <Route path='/ListMenu' element={<ListMenupage/>} />
      </Routes>
    </Router>
  )
}

export default App;
