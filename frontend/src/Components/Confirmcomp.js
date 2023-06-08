import "../Style/Confirmpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "https://app.sandbox.midtrans.com/snap/snap.js";

const Confirmcomp = (props) => {
  const params = useParams();
  const urlParams = params.idUser;
  const [data, setData] = useState([]);
  const paymentSukses = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cartPelanggan/` + urlParams)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log("message :", err));
  }, [data]);

  const toStatusPage = (idOrder) => {
    paymentSukses("/Statuspage/" + urlParams, { state: { id: 1, idOrder: idOrder } });
  }

  const payment = async (e) => {
    let parameter;
    let idOrder;
    {
      data?.result.map((newData) => (
        parameter = {
          "transaction_details": {
            "order_id": newData.idKeranjang.toString(),
            "gross_amount": data.totalHarga
          },
          "credit_card": {
            "secure": true
          },
          "customer_details": {
            "first_name": newData.namaPelanggan.toString(),
            "last_name": "",
          }
        },
        idOrder = newData.idKeranjang
      ))
    };


    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/midtransPayment/`,
        parameter
      )
      .then((res) => {
        const responseAPI = res.data.data;
        console.log("transaction token:", responseAPI, "url :", res.data.url);
        window.snap.pay(responseAPI, {
          onSuccess: () => (toStatusPage(idOrder)),
          onPending: () => (toStatusPage(idOrder)),
          onError: () => (toStatusPage(idOrder)),
          onClose: () => (toStatusPage(idOrder)),
        });
      })
      .catch((err) => console.log("error : ", err));
  };

  const menus = props.menu;
  const location = useLocation();
  const { url } = location.state;

  let arr = data.result ?? [];
  return (
    <div className="App">
      <div className="logo-back">
        <Link to={`/Berandapage/${url}`} style={{ color: "black" }}>
          <CgArrowLeftO size={35} style={{ paddingRight: "5%" }} />
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

      <table
        style={{
          width: "95%",
          textAlign: "left",
          marginLeft: "3%",
          border: "1px solid #BFBFBF",
        }}
      >
        <tr className="text-title">
          <td colSpan={2}>Paket yang dipilih</td>
        </tr>
        {arr[0]?.dataPesanan?.map((item) => (
          <>
            <tr className="text-title3">
              <td style={{ padding: "5px", paddingLeft: "5%", width: "40%" }}>
                {item.namaMenu}{" "}
              </td>
              <td style={{ textAlign: "center" }}>{item.qty}x</td>
              <td>Rp. {item.hargaMenu * item.qty}</td>
            </tr>
          </>
        ))}
        <tr style={{ fontWeight: "bold" }}>
          <td>Total </td>

          <td colSpan={2} style={{ textAlign: "center", paddingLeft: "30%" }}>
            Rp. {data.totalHarga}
          </td>
        </tr>
        <tr>
          <td> </td>
        </tr>
      </table>

      <div>
        <br></br>

        <button
          type="button"
          onClick={payment}
          className="button-proses-pembayaran"
        >
          Pilih Metode Pembayaran
        </button>
      </div>
    </div>
  );
};

export default Confirmcomp;
