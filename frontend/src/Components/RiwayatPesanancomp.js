import "../Style/Confirmpage.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

import axios from "axios";
const Riwayatpesanancomp = (props) => {
  const menus = props.menu;
  const location = useLocation();
  const { url } = location.state;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [riwayat, setRiwayat] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/getAllTransaksi/` + url)
      .then((result) => {
        setRiwayat(result.data);
      })
      .catch((error) => console.log(error));
  }, [riwayat]);

  const [message, setMessage] = useState();
  const [idtransaksi, idTransaksi] = useState();
  const handleClick = (value) => {
    setMessage(value);
  };
  const [transaksi, setTransaksi] = useState();

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/getDetailTransaksi/` +
          url +
          "/" +
          message
      )
      .then((response) => {
        setTransaksi(response.data);
      });
  }, [transaksi]);

  const [metode, setMetode] = useState();
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getTransactionStatus/` + message)
      .then((response) => {
        setMetode(response.data);
      });
  }, [metode]);
  // console.log(transaksi?.data[0]?.dataPesanan);
  let isitransaksi = transaksi?.data[0];

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
            RIWAYAT TRANSAKSI
          </button>
        </div>
      </div>

      {riwayat.data?.map((d, index) => {
        return (
          <>
            <div class="card mx-4" style={{ marginBottom: "5px" }}>
              <div class="col-md-4">
                <div class="card-body">
                  <h2
                    class="card-title"
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    {" "}
                    Meja no : {d.noMeja}
                  </h2>

                  {/* <p class="card-text">
                    <small class="text-muted">{d.tanggal}</small>
                  </p>
                  <h6 class="card-title">Pembayaran : {d.statusBayar}</h6> */}
                  <p
                    style={{
                      textalign: "left",
                      width: "49%",
                      display: "inline-block",
                    }}
                  >
                    {d.tanggal}
                  </p>
                  <p
                    style={{
                      textalign: "right",
                      width: "50%",
                      display: "inline-block",
                    }}
                  >
                    Status : {d.statusBayar}
                  </p>
                  <Modaltransaksi
                    value={d}
                    handleShow={handleShow}
                    show={show}
                    handleClose={handleClose}
                    riwayat={riwayat}
                    idtransaksi={transaksi?.idTransaksi}
                    handleClick={handleClick}
                    isitransaksi={isitransaksi}
                    metode={metode}
                  ></Modaltransaksi>
                </div>
              </div>
            </div>
          </>
        );
      })}

      <div>
        <br></br>
      </div>
    </div>
  );
};

export default Riwayatpesanancomp;

export const Modaltransaksi = ({
  value,
  handleShow,
  show,
  handleClose,
  riwayat,
  idtransaksi,
  handleClick,
  isitransaksi,
  metode,
}) => {
  return (
    <>
      {" "}
      <button
        className="button-detail"
        onClick={() => {
          handleClick(value.idTransaksi);
          handleShow();
        }}
        style={{ borderRadius: "8px" }}
      >
        Detail
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ background: "white" }}
      >
        <Modal.Header closeButton>
          <Modal.Title class="modal-title w-100 text-center">
            <h3>Detail Transaksi</h3>
          </Modal.Title>
        </Modal.Header>
        <div className="">
          <table class="table table-borderless">
            {isitransaksi?.dataPesanan.map((d, index) => {
              return (
                <>
                  <table class="table table-borderless"></table>
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td>{d.namaMenu}</td>
                      <td>{d.qty}x</td>
                      <td>{d.hargaMenu}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>Meja</td>
                <td></td>
                <td style={{ textAlign: "right" }}> {isitransaksi?.noMeja}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Waktu</td>
                <td></td>
                <td style={{ textAlign: "right" }}> {isitransaksi?.tanggal}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Status</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {isitransaksi?.statusBayar}
                </td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Pembayaran</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {metode?.data?.payment_type}
                </td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Nama Pemesan</td>
                <td></td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {isitransaksi?.namaPelanggan}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <br></br>
        <Modal.Footer>
          <div class="modal-footer border-0">
            <h5 style={{ fontWeight: "bold" }}>
              Total. {isitransaksi?.totalHarga}
            </h5>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
