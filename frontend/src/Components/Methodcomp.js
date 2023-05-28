import "../Style/Methodpage.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Navbarcomp from "./Navbarcomp";
import BCALogo from "../Photo/bcalogo.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const Methodcomp = (props) => {
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
            PILIH METODE PEMBAYARAN
          </button>
        </div>
      </div>

      <div class="d-grid gap-20 col-10 mx-auto">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-1 rounded-pill"
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
          <Accordion.Item eventKey="10">
            <Accordion.Header>Cash / Tunai</Accordion.Header>
          </Accordion.Item>
          <br></br>

          <Accordion.Item eventKey="1">
            <Accordion.Header>M - Banking</Accordion.Header>
            <Accordion.Body>
              <Link
                to={`/KonfirmasiPesanan/` + urlParams}
                state={{ url: urlParams }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div class="card mx-auto" style={{ margin: "5px" }}>
                  <div class="card-body">
                    <img
                      class="card-img col float-start"
                      src={BCALogo}
                      alt="Card image"
                      style={{ width: "50px" }}
                    ></img>
                    <div>BCA</div>
                  </div>
                </div>
              </Link>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <br></br>

          <Accordion.Item eventKey="2">
            <Accordion.Header>E - Money</Accordion.Header>
            <Accordion.Body>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
              <div class="card mx-auto" style={{ margin: "5px" }}>
                <div class="card-body">
                  <img
                    class="card-img col float-start"
                    src={BCALogo}
                    alt="Card image"
                    style={{ width: "50px" }}
                  ></img>
                  <div>Bank Central Asia</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Methodcomp;
