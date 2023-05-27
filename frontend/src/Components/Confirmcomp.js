import "../Style/Confirmpage.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Navbarcomp from "./Navbarcomp";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Confirmcomp = (props) => {
  const params = useParams();
  const urlParams = params.idUser;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8888/cartPelanggan/" + urlParams)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

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
          {data.result?.map((item) => (
            <>
              <tr className="text-title1">
                <td>{item.namaMenu} </td>
                <td style={{ textAlign: "center" }}>{item.qty}x</td>
                <td>Rp. {item.hargaMenu * item.qty}</td>
              </tr>
            </>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td>Total </td>
            <td></td>
            <td>Rp. {data.totalHarga}</td>
          </tr>
          <tr>
            <td> </td>
          </tr>
        </table>
      </div>

      <div>
        <br></br>
        <button className="button-proses-pembayaran">Bayar Di Kasir</button>
      </div>
    </div>
  );
};

export default Confirmcomp;
