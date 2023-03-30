import "../Style/Detailmenupage.css";
import * as React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

const Detailmenucomp = (props) => {
  const menus = props.menu
  const location = useLocation()
  const { url } = location.state
  return (


    <div className="App">
      <Link to={`/Berandapage/${url}`}>
        <button className="btn btn-dark">Back</button>
      </Link>
      <section className="hero">
        <img
          src={Gambarburger}
          alt="test"
          className="parallax"
        />
        <div class='content'>
          <h1 class="pagetitle">Nama makanan</h1>
          <p class="sub-headline"> {menus.namaMenu}</p>
          <h4 class="headline">Deskripsi</h4>
          <p class="sub-headline"> {menus.deskripsiMenu}</p>
          <h1 class="pagetitle">Harga Makanan</h1>
          <p class="sub-headline">RP. {menus.hargaMenu}</p>
          <h4 class="headline">Stok Menu</h4>
          <p class="sub-headline"> {menus.stokMenu}</p>
        </div>
        <div>
          <button className="button-konfir" >Konfirmasi Pemesanan</button>
        </div>
      </section>
    </div>
  )



}

export default Detailmenucomp;