import "../Style/Confirmpage.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

const Statuscomp = (props) => {
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

    <div class= "d-grid gap-20 col-10 mx-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-5 rounded-pill"
                aria-label="Search"
              />
              <Button className="rounded-pill" variant="outline-primary">
                Search
              </Button>
            </Form>
    </div>
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

export default Statuscomp;
