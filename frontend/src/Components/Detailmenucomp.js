import "../Style/Detailmenupage.css";
import * as React from "react";
import Gambarburger from "../Photo/Burger.jpeg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

const Detailmenucomp = (props) => {
  const menus = props.menu;
  const location = useLocation();
  const { url } = location.state;
  return (
    <div className="App">
      <img src={menus.imageUrl} alt="test" className="parallax" />
      <div class="content">
        <div className="detail-namamenu"> {menus.namaMenu}</div>

        <div class="text text-start text-warning">
          <BsStarFill size="10px"></BsStarFill>
          <BsStarFill size="10px"></BsStarFill>
          <BsStarFill size="10px"></BsStarFill>
          <BsStarFill size="10px"></BsStarFill>
          <BsStarFill size="10px"></BsStarFill>
        </div>

        <br />
        <div className="detail-namamenu">
          <text className="detail-deskripsi-text">Deskripsi </text>
        </div>
        <p className="detail-deskripsi"> {menus.deskripsiMenu}</p>

        {/* <h1 class="pagetitle">Harga Makanan</h1>
          <p class="sub-headline">RP. {menus.hargaMenu}</p>
          <h4 class="headline">Stok Menu</h4>
          <p class="sub-headline"> {menus.stokMenu}</p> */}
      </div>
      <Link to={`/Berandapage/${url}`}>
        <button className="button-kembali">Kembali</button>
      </Link>
    </div>
  );
};

export default Detailmenucomp;
