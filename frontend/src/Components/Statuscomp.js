import "../Style/Confirmpage.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Navbarcomp from "./Navbarcomp";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { useScreenshot, createFileName } from "use-react-screenshot";

import html2canvas from "html2canvas";
import Swal from "sweetalert2";
const Statuscomp = (props) => {
  const printRef = React.useRef();
  const [copySuccess, setCopySuccess] = useState("");
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const notifsukses = () => {
    Swal.fire({
      title: "Sukses ",
      text: "Tautan Berhasil di Copy  ",
      icon: "success",
      button: false,
      timer: 1500,
    });
  };
  const params = useParams();
  const urlParams = params.idUser;
  const user = props.user;
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:8888/getCustomerById/" + urlParams)
      .then((response) => {
        setPost(response.data);
      });
  }, [post]);

  let ininama = post?.data[0]?.name;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8888/cartPelanggan/" + urlParams)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const menus = props.menu;
  const location = useLocation();
  let arr = data.result ?? [];

  return (
    <div className="App">
      <div className="logo-back">
        <Link to={`/Berandapage/${urlParams}`} style={{ color: "black" }}>
          <CgArrowLeftO size={35} style={{ paddingRight: "5%" }} />
        </Link>
      </div>
      <div ref={printRef}>
        <br></br>
        <br></br>
        <br></br>
        <BsCheckCircle style={{ fontSize: "100" }}></BsCheckCircle>
        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
          Pembayaran Berhasil
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "bold",

            textAlign: "center",
          }}
        >
          Terimakasih sudah melakukan transaksi pada aplikasi Cafeasy
        </div>
        <br></br>
        <table
          style={{
            width: "95%",
            textAlign: "left",
            marginLeft: "3%",
            border: "1px solid #BFBFBF",
          }}
        >
          <tr className="text-title">
            <td colSpan={3} style={{ textAlign: "center" }}>
              Detail Transaksi
            </td>
          </tr>
          {arr[0]?.dataPesanan?.map((item) => (
            <>
              <tr className="text-title1">
                <td style={{ padding: "5px", paddingLeft: "5%" }}>
                  {item.namaMenu}{" "}
                </td>
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
          <br></br>
          <tr>
            <td style={{ fontWeight: "bold" }}>Pembayaran BCA </td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", opacity: "50%" }}>Barista Rizky </td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", opacity: "50%" }}>Meja no.01 </td>
          </tr>
          <br></br>
          <tr>
            <td>Nama Pengguna </td>
            <td></td>
            <td>{ininama}</td>
          </tr>
          <tr>
            <td>No telpon </td>
            <td></td>
            <td>0821419122 </td>
          </tr>
        </table>
        <br></br>
      </div>
      <div>
        <div class="row">
          <div class="col-6">
            <button
              className="button-status"
              style={{ borderRadius: "8px" }}
              onClick={handleDownloadImage}
            >
              Simpan Bill
            </button>
          </div>
          <div class="col-6">
            <button
              className="button-status"
              style={{ borderRadius: "8px" }}
              onClick={() => {
                notifsukses();
                copyToClipBoard(
                  "Pembayaran berhasil dilakukan! Buka tautan ini untuk melihat nota transaksi yang sudah dibayar : " +
                    urlParams
                );
              }}
            >
              Bagikan
            </button>
          </div>
        </div>
        <br></br>
        <Link to={`/Berandapage/${urlParams}`}>
          <button className="button-proses-pembayaran">Kembali</button>
        </Link>
      </div>
    </div>
  );
};

export default Statuscomp;
