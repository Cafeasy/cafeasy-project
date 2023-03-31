import "../Style/Navbar.css";
import Logoputih from "../Photo/LogoOnly.png";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Gambarburger from "../Photo/Burger.jpeg";
import Gambarpizza from "../Photo/Pizza.jpeg";
import Gambarwaffels from "../Photo/Waffles.jpeg";
import "../Style/Maincourse.css";
import { BsPlusCircle } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";
import "../Style/Slidergambar.css";
import "../Style/Navbar.css";
import { useNavigate } from "react-router-dom";
import ShowMore from 'react-show-more-button';



import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";

import { CgArrowLeftO } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import { useParams } from "react-router-dom";


function Navbarcomp(props) {

  const params = useParams();
  const urlParams = params.idUser

  const user = props.user;
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8888/ListMenu")
      .then((result) => {
        // console.log("data API ada", result.data);
        const responseAPI = result.data;
        setMenus(responseAPI.data);
      })
      .catch((err) => {
        // console.log("error: data tidak terambil - ", err);
      });
  });
  const [show, toggleShow] = useState(false);
  const [active, setActive] = useState("firstcard");
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(2);
  const showmoritem  = () => {
    setVisible((prevValue) => prevValue + 12)
  }
  const showmoritems  = () => {
    setVisible((prevValue) => prevValue - 12)
  }
  const searchText = (event) => {
    setFilter(event.target.value);
  };
  let dataSearch = menus.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <>
      <div className="">
        {["sm"].map((expand) => (
          <Navbar key={expand} expand={expand} className="mb-4">
            <Container fluid>
              <Navbar.Brand href="#"></Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasDarkLabel-expand-${expand}`}>
                    <div className="brand-color"></div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown
                      title={`Welcome,  ${user?.name}`}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>
                        {" "}
                        <button
                          class="btn btn-light btn-rounded"
                          type="button"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <img
                      className="logonav"
                      alt="logo putih"
                      src={Logoputih}
                    ></img>
                    <h1 className="logotext">CAFEASY</h1>
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Profile</Nav.Link>
                    <Nav.Link href="#action3">Kontak</Nav.Link>
                    <Nav.Link href="#action4">Bantuan</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
            <Form className="d-flex mx-auto">
              <Form.Control
                type="input"
                placeholder="Search....."
                className="searchbar"
                aria-label="Search"
                value={filter}
                onChange={searchText.bind(this)}
              />
            </Form>
          </Navbar>
        ))}
      </div>
      <div className="bestmenu">
        {" "}
        <Carousel>
          <Carousel.Item>
            <img
              className="Gambarslider"
              src={Gambarburger}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="caption">Burger Besar</h3>
              <p className="caption2">120k.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="Gambarslider"
              src={Gambarpizza}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 className="caption">Pizza Domino</h3>
              <p className="caption2">90K</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="Gambarslider"
              src={Gambarwaffels}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="caption">Waffles Murah</h3>
              <p className="caption2">40k</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        <div class="navbar-container">
          <ul>
            <li fill class="nav-link active-link">
              <a href="#" onClick={() => setActive("firstcard")}>
                Waffels
              </a>
              <div class="underline"></div>
            </li>
            <li class="nav-link">
              <a href="#" onClick={() => setActive("secondcard")}>
                Desert
              </a>
              <div class="underline"></div>
            </li>
            <li class="nav-link">
              <a href="#" onClick={() => setActive("thirdcard")}>
                Main Course
              </a>
              <div class="underline"></div>
            </li>
            <li class="nav-link">
              <a href="#" onClick={() => setActive("fourthcard")}>
                Drink
              </a>
              <div class="underline"></div>
            </li>
          </ul>
        </div>
      </div>

      <div className="listmenu">
        {active === "firstcard" && (
          <Row xs={2} md={4} className="g-0">
            {dataSearch.slice(0, visible).map((menu, index) => {
              return (
                <Col>
                  <Card
                    className="mx-1  mb-5 border-0 "
                    key={menu.idMenu}
                    data-example={menu.namaMenu}
                  >
                    <Link to={`/Detailmenu/${menu.idMenu}`} state={{ url: urlParams }} >

                      <Card.Img variant="top" src={Gambarburger} />
                    </Link>
                    <Card.Body>
                      <Card.Title className="menu-harga">52K</Card.Title>
                      <Card.Title className="menu-tittle">
                        {menu.namaMenu}
                      </Card.Title>
                      <div className="rate">
                        <div class="text text-end text-warning">
                          <BsStarFill size="10px"></BsStarFill>
                          <BsStarFill size="10px"></BsStarFill>
                          <BsStarFill size="10px"></BsStarFill>
                          <BsStarFill size="10px"></BsStarFill>
                          <BsStarFill size="10px"></BsStarFill>
                        </div>

                        <div class="text text-end text-dark">
                          <ModalCustom menuList={menu} />
                        </div>
                      </div>
                      <Card.Text className="menu-deskripsi">
                        {menu.deskripsiMenu}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
        {active === "secondcard" && (
          <Row xs={2} md={4} className="g-0">
            {dataSearch.map((menu, index) => (
              
              <Col>
                <Card className="mx-1 mb-5 border-0 " key={menu._id}>
            
                  <Link to={`/Detailmenu/${menu.idMenu}`} state={{ url: urlParams }} >
                    <Card.Img variant="top" src={Gambarburger} />
                  </Link>
                  <Card.Body>
                    <Card.Title className="menu-harga">62K</Card.Title>
                    <Card.Title className="menu-tittle">
                      {menu.namaMenu}
                    </Card.Title>
                    <div className="rate">
                      <div class="text text-end text-warning">
                        <BsStarFill size="10px"></BsStarFill>
                        <BsStarFill size="10px"></BsStarFill>
                        <BsStarFill size="10px"></BsStarFill>
                        <BsStarFill size="10px"></BsStarFill>
                        <BsStarFill size="10px"></BsStarFill>
                      </div>

                      <div class="text text-end text-dark">
                        <Button className="buttonplus" variant="text">
                          <BsPlusCircle></BsPlusCircle>
                        </Button>
                      </div>
                    </div>
                    <Card.Text className="menu-deskripsi">
                      {menu.deskripsiMenu}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        )}   
        <div className="button-hide">
        <p onClick={showmoritem}>
         <text onClick={()=> toggleShow(!show)}>{show ? "" : "More Menu" }</text></p>
         <p onClick={showmoritems}>
         <text onClick={()=> toggleShow(!show)}>{show ? "Less Menu " : "" }</text></p>
         </div>
      </div>

      <div>
       
        <ul class="fw-bold">Total.</ul>
        <button className="button-konfir" onClick={""}>
          Konfirmasi Pemesanan
        </button>
      </div>
    
    </>
  );
}
const ModalCustom = ({ menuList }) => {
  const [show, setShow] = useState(false);
  let [count, setCount] = useState(0);
 
  function incrementCount() {
    if (count < 10) {
      setCount(count + 1);
    } 
  }
  function decrementCount() {
    if (count > 0) {
      setCount(count - 1);
    } 
  }
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div class="text text-end text-dark">
        {
          <Button className="buttonplus" variant="text" onClick={handleClick}>
            <BsPlusCircle></BsPlusCircle>
          </Button>
        }
      </div>

      {show && (
        <Modal
          show={show}
          onHide={handleClick}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <br></br>
       <CgArrowLeftO class="mx-4" size={35} onClick={handleClick}/>
          <Modal.Body>
            <img src={Gambarburger} alt="gambarpizza" className="gambarmodal" />
            <div className="textmodal">{menuList.namaMenu}<p></p></div>
         {/* <div className="textmodal_deskripsi">{menuList.deskripsiMenu}</div> */}
            <div className="textmodal_harga">{"50K"}</div>
            <br></br>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              ></Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                
                <div className="modal_tengah">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Kuantitas :</Form.Label>
                    <br />
                    <Button
                      variant="text"
                      size="sm"
                      className="mx-4"
                      onClick={decrementCount}
                    >
                      <CgRemove size={25}></CgRemove>
                    </Button>

                    <strong>{count}</strong>

                    <Button
                      variant="text"
                      size="sm"
                      className="mx-4"
                      onClick={incrementCount}
                    >
                      <CgAdd size={25}></CgAdd>
                    </Button>
                  </Form.Group>

                  <Form.Label>Tambahkan Catatan : </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="col text-center">
              <button className="button-konfir_modal" onClick={handleClick}>
                Tambah Pesanan
              </button>
            </div>
          </Modal.Footer>
        </Modal>


      )}
    </>
  );
};

export default Navbarcomp;
