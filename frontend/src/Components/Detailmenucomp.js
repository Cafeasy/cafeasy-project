import "../Style/Detailmenupage.css";
import * as React from "react"
import Gambarburger from '../Photo/Burger.jpeg'


const Detailmenucomp = (props) => {
  const menus = props.menu

  return (
    menus.map((menu) => {
      return (
        <div className="App">
          <section className="hero">
            <img
              src={Gambarburger}
              alt="test"
              className="parallax"
            />
            <div class='content'>
              <h1 class="pagetitle">Nama makanan</h1>
              <p class="sub-headline"> {menu.namaMenu}</p>
              <h4 class="headline">Deskripsi</h4>
              <p class="sub-headline"> {menu.deskripsiMenu}</p>
              <h1 class="pagetitle">Harga Makanan</h1>
              <p class="sub-headline">RP. {menu.hargaMenu}</p>
              <h4 class="headline">Stok Menu</h4>
              <p class="sub-headline"> {menu.stokMenu}</p>
            </div>
            <div>
              <button className="button-konfir" >Konfirmasi Pemesanan</button>
            </div>
          </section>
        </div>
      )
    })

  )
}

export default Detailmenucomp;