import "../Style/Detailmenupage.css";
import * as React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import { useEffect, useState } from "react"
import axios from "axios";

const Detailmenucomp = (props) => {
  const idMenu = props.idMenu;
  const [, setOffset] = useState(0)
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/DetailMenu/${idMenu}`)
    .then(result => {
      console.log('data API ada', result.data);
      const responseAPI = result.data;

      setMenus(responseAPI.data);
    })
    .catch(err => {
      console.log('error: data tidak terambil - ', err);
    })
    function handleScroll() {
      setOffset(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <div className="App">
      <section className="hero">
        <img
          src={Gambarburger}
          alt="test"
          className="parallax"
        />
        <div class='content'>
          <h1 class="pagetitle">{menus.namaMenu}</h1>
          <h4 class="headline">Deskripsi</h4>
          <p class="sub-headline"> {menus.deskripsiMenu}</p>
        </div>
        <div>
          <button className="button-konfir" >Konfirmasi Pemesanan</button>
        </div>
      </section>
    </div>
  )
}

export default Detailmenucomp;