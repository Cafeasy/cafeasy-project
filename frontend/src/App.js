import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import Landingpage from './Pages/Landingpage';
import Loginpage from './Pages/Loginpage';
import "./Style/Landingpage.css"
import "./Style/Loginpage.css"
import Navbarpage from './Pages/Navbarpage';
import Berandapage from './Pages/Berandapage';
import ListMenupage from './Pages/ListMenupage';
import Confirmpage from './Pages/Confirmpage';
import "./Style/ListMenupage.css"
import "./Style/Confirmpage.css"



function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Navigate to="/Berandapage" /> : <Landingpage />} />
        <Route exact path='/Loginpage' element={user ? <Navigate to="/Berandapage" /> : <Loginpage />} />
        <Route exact path='/Navbarpage' element={user ? <Navigate to="/Berandapage" /> : <Navbarpage />} />
        <Route  exact path='/Berandapage' element={user ? <Berandapage user={user} /> : <Navigate to="/Loginpage" />} />
        <Route exact path='/ListMenu' element={user ? <Navigate to="/Berandapage" /> : <ListMenupage />} />
        <Route exact path='/KonfimasiPesanan' element={user ? <Navigate to="/Berandapage" /> : <Confirmpage />} />
      </Routes>
    </Router>
  )
}

export default App;
