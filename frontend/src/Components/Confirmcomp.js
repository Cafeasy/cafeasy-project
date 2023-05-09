import "../Style/Confirmpage.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
const Confirmcomp = (props) => {
  const menus = props.menu;
  const location = useLocation();
  const { url } = location.state;
  return (
    <div className="App">
      <div className="logo-back">
        <Link to={`/Berandapage/${url}`} style={{ color: "black" }}>
          <CgArrowLeftO class="mx-4" size={35} />
        </Link>
      </div>

      <br></br>
      <br></br>
      <div>
        <br></br>
        <div class="d-grid  col-9 mx-auto mt-6">
          <button
            type="submit"
            className="button-konfir-pesanan"
            disabled="true"
          >
            KONFIRMASI PESANAN
          </button>
        </div>
      </div>
      <div className="">
        <table style={{ maxHeight: "20vw" }} className="isi-pesanan">
          <tr className="text-title">
            <td>Paket yang dipilih</td>
          </tr>

          <tr className="text-title1">
            <td>American waffle </td>
            <td style={{ textAlign: "center" }}>1x</td>
            <td>Rp 20.000,00</td>
          </tr>

          <tr className="text-title1">
            <td>Belgian waffle </td>
            <td style={{ textAlign: "center" }}>1x</td>
            <td>Rp 20.000,00</td>
          </tr>

          <tr className="text-title1">
            <td>Diskon </td>
            <td></td>
            <td>(Rp 5.000,00)</td>
          </tr>

          <tr className="text-title1">
            <td>Sub Total </td>
            <td></td>
            <td>Rp 20.000,00</td>
          </tr>

          <tr className="text-title1">
            <td>Biaya pelayanan </td>
            <td></td>
            <td>Rp 2.000,00</td>
          </tr>

          <tr className="text-title1">
            <td>Take away </td>
            <td></td>
            <td>Rp 2.000,00</td>
          </tr>
          <tr style={{ fontWeight: "bold" }}>
            <td>Total </td>
            <td></td>
            <td>Rp 20.000,00</td>
          </tr>
        </table>
      </div>

      <div>
        <br></br>
        <Link to={`/Statuscomp/${url}`}>
        <button className="button-proses-pembayaran">Bayar Di Kasir</button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmcomp;
