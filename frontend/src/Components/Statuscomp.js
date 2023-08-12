import "../Style/Confirmpage.css";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

const Statuscomp = (props) => {
  const location = useLocation();
  const newIdOrder = location.state?.idOrder;
  const printRef = React.useRef();
  const [copySuccess, setCopySuccess] = useState("");
  let [data, setData] = useState([]);
  useEffect(() => {
    getDataTransaksi();
  }, []);

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

  const getDataTransaksi = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getDetailTransaksi/${urlParams}/${newIdOrder}`
      )
      .then((res) => {
        const response = res.data.data;
        setData(response);
      })
      .catch((err) => window.alert("Koneksi Bermasalah"));
  };

  let idtransaksi = data[0]?.idTransaksi;
  const [message, setMessage] = useState();
  const [metode, setMetode] = useState();
  let messageTransaksi;

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getTransactionStatus/` + idtransaksi
      )
      .then((response) => {
        setMetode(response.data);
      });

  }, [metode]);


  return (
    <div className="App">
      <div ref={printRef}>
        <br></br>
        <br></br>
        <br></br>
        <BsCheckCircle style={{ fontSize: "100" }}></BsCheckCircle>

        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
          Status Pembayaran : {data[0]?.statusBayar}{" "}
        </div>

        <div
          style={{
            fontSize: "13px",
            fontWeight: "bold",

            textAlign: "center",
          }}
        >
          {data[0]?.statusBayar == "PENDING" ? messageTransaksi = "Pembayaran Belum Selesai, Silahkan Melakukan Pembayaran Ulang" : messageTransaksi = "Terimakasih sudah melakukan transaksi pada aplikasi Cafeasy"}
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

          {data[0]?.dataPesanan.map((d, i) => {
            return (
              <>
                <tr className="text-title1">
                  <td style={{ padding: "5px", paddingLeft: "5%" }}>
                    {d.namaMenu}
                  </td>
                  <td style={{ textAlign: "center" }}>{d.qty}x </td>
                  <td>Rp. {d.hargaMenu * d.qty}</td>
                </tr>
              </>
            );
          })}

          <tr style={{ fontWeight: "bold" }}>
            <td>Total </td>
            <td></td>
            <td>Rp. {data[0]?.totalHarga}</td>
          </tr>

          <br></br>
          <tr>
            <td style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              Pembayaran {metode?.data?.payment_type}{" "}
            </td>
          </tr>
          <tr>
            <td style={{ fontSize: "13px", opacity: "50%" }}>
              {" "}
              Meja no.{data[0]?.noMeja}{" "}
            </td>
          </tr>
          <br></br>
          <tr>
            <td>Nama Pengguna </td>
            <td></td>
            <td>{data[0]?.namaPelanggan}</td>
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
                  "Pembayaran berhasil dilakukan! Buka tautan ini untuk melihat nota transaksi yang sudah dibayar : http://cafeasy.shop/Statuspage/" +
                  urlParams
                );
              }}
            >
              Bagikan
            </button>
          </div>
        </div>
        <br></br>

        <Link to={`/Berandapage/` + urlParams} state={{ url: urlParams }}>
          <button className="button-proses-pembayaran">Kembali</button>
        </Link>
      </div>
    </div>
  );
};

export default Statuscomp;
