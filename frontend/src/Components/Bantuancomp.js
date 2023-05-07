import "../Style/Confirmpage.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MDBCol, MDBIcon } from "mdbreact";
import Accordion from 'react-bootstrap/Accordion';

const Bantuancomp = (props) => {
    const menus = props.menu;
    const location = useLocation();
    const { url } = location.state;
  return (
    <div className="App">
    <br></br>
    <br></br>
    <div>
      <br></br>
      <div class="d-grid  col-9 mx-auto mt-6">
        <button type="submit" className="button-konfir-pesanan" disabled="true">BANTUAN</button>
      </div>
    </div>

    <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input
          className="form-control my-0 py-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </MDBCol>
    <br></br>

    <div class="d-grid gap-20 col-10 mx-auto">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Saya tidak dapat menggunakan aplikasi Cafeasy</Accordion.Header>
            <Accordion.Body>
              Itu disebabkan karena anda belum mempunyai akun yang terkait.
            </Accordion.Body>
          </Accordion.Item>
          <br></br>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Terjadi kendala ketika konfirmasi pembayaran</Accordion.Header>
            <Accordion.Body>
              Pastikan anda melakukan pembayaran dengan benar, cek terlebih dahulu pesenan yang diinginkan.
            </Accordion.Body>
          </Accordion.Item>
        <br></br>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Metode pembayaran tidak tersedia pada halaman</Accordion.Header>
            <Accordion.Body>
              Pastikan anda melakukan pembayaran yang anda mau, bisa menggunakan e-payment ataupun bayar langsung.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>

    <div>
        <br></br>
        <Link to={`/Berandapage/${url}`}>
        <button className="button-proses-pembayaran">Kembali</button>
        </Link>
      </div>
    </div>
  );
};

export default Bantuancomp;
