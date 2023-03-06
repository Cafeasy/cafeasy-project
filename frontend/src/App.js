import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './Pages/Landingpage';
import Loginpage from './Pages/Loginpage';
import "./Style/Landingpage.css"
import "./Style/Loginpage.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/Loginpage' element={<Loginpage />} />
      </Routes>
    </Router>
  )
}

export default App;
