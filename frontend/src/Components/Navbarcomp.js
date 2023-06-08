import "../Style/Navbar.css";
import Swal from "sweetalert2";
import Logoputih from "../Photo/LogoOnly.png";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import { BsDashCircle } from "react-icons/bs";

import { AiOutlineDelete } from "react-icons/ai";
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
import CartList from "./Cartlist";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";

import { CgArrowLeftO } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import { useParams } from "react-router-dom";

function Navbarcomp(props) {
  // class App extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       keranjangs: [],
  //     };
  //   }
  // }

  const params = useParams();
  const urlParams = params.idUser;

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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  // const datadalam = notifsukses.menu.namaMenu;
  // console.log(datadalam);
  const [inidata, setInidata] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    const post = {
      qty: 1,
      catatanPelanggan: "mantap banget gais",
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/postCart/` +
          urlParams +
          "/" +
          inidata.idMenu,
        post
      );
      console.log(res.data);
    } catch (e) {
      alert(e);
    }
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cartPelanggan/` + urlParams)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const addItem = (value) => {
    console.log(value);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cartPelangganPlus/` +
          urlParams +
          "/" +
          value
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const minItem = (value) => {
    console.log(value);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/cartPelangganMinus/` +
          urlParams +
          "/" +
          value
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteItem = (value) => {
    console.log(value);
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/delCart/` + urlParams + "/" + value
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ListMenuByCategory/Minuman`)
      .then((response) => {
        setPost(response.data);
      });
  }, [post]);

  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(` ${process.env.REACT_APP_API_URL}/ListMenuByCategory/Minuman`)
  //     .then((result) => {
  //       console.log(result.data);
  //       setPosts(result.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const [show, setShow] = useState(false);
  let [count, setCount] = useState(1);

  function incrementCount() {
    if (count < 10) {
      setCount(count + 1);
    }
  }
  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  const handleClick = () => {
    setShow(!show);
  };
  const notifsukses = (menu) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Menambah Keranjang " + menu.namaMenu,
      icon: "success",
      button: false,
      timer: 1000,
    });
  };

  const [cart, setCart] = useState([]);

  const [toggleshow, toggleShow] = useState(false);
  const [active, setActive] = useState("firstcard");

  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(2);
  const showmoritem = () => {
    setVisible((prevValue) => prevValue + 12);
  };
  const showmoritems = () => {
    setVisible((prevValue) => prevValue - 12);
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const [cari, setCari] = useState("");

  let dataSearch = menus.filter((val) => {
    if (cari === "") {
      return val;
    } else if (
      val.namaMenu?.toLocaleLowerCase().includes(cari.toLocaleLowerCase())
    ) {
      return val;
    }
  });

  const notifDelete = (value) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Menghapus Keranjang " + value,
      icon: "success",
      button: false,
      timer: 1500,
    });
  };
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const removeMe = (index) => {
    const temp = [...cart];
    temp.splice(index, 1);
    setCart(temp);
  };

  let arr = data.result ?? [];

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

                    <Nav.Link
                      as={Link}
                      to={`/RiwayatPesanan/${menus.idMenu}`}
                      state={{ url: urlParams }}
                    >
                      Riwayat Transaksi
                    </Nav.Link>

                    <Nav.Link
                      as={Link}
                      to={`/Bantuanpage/${menus.idMenu}`}
                      state={{ url: urlParams }}
                    >
                      FAQ
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
            <Form className="d-flex mx-auto">
              <Form.Control
                placeholder="Search....."
                className="searchbar"
                aria-label="Search"
                onChange={(e) => setCari(e.target.value)}
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
            {dataSearch.map((menu, index) => {
              return (
                <Col>
                  <Card
                    className="mx-1  mb-5 border-0 "
                    key={menu.idMenu}
                    data-example={menu.namaMenu}
                    masukKeranjang={menu.masukKeranjang}
                  >
                    <Link
                      to={`/Detailmenu/${menu.idMenu}`}
                      state={{ url: urlParams }}
                    >
                      <Card.Img variant="top" src={Gambarburger} />
                    </Link>
                    <Card.Body>
                      <Card.Title className="menu-harga">
                        {menu.hargaMenu}
                      </Card.Title>
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
                      </div>

                      <ModalCustom
                        menuList={menu}
                        onSubmit={onSubmit}
                        notifsukses={notifsukses}
                        menu={menu}
                        setInidata={setInidata}
                      />

                      <Card.Text className="menu-deskripsi">
                        {menu.deskripsiMenu}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
            {post?.data
              .filter((val) => {
                if (cari === "") {
                  return val;
                } else if (
                  val.namaMenu
                    ?.toLocaleLowerCase()
                    .includes(cari.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .map((menu, index) => {
                return (
                  <Col>
                    <Card
                      className="mx-1  mb-5 border-0 "
                      key={menu.idMenu}
                      data-example={menu.namaMenu}
                      masukKeranjang={menu.masukKeranjang}
                    >
                      <Link
                        to={`/Detailmenu/${menu.idMenu}`}
                        state={{ url: urlParams }}
                      >
                        <Card.Img variant="top" src={Gambarburger} />
                      </Link>
                      <Card.Body>
                        <Card.Title className="menu-harga">
                          {menu.hargaMenu}
                        </Card.Title>
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
                            <form
                              action=""
                              id="login"
                              method="post"
                              onSubmit={onSubmit}
                            >
                              <div
                                className="menu-harga"
                                style={{ fontSize: "13px" }}
                              >
                                Sold Out
                              </div>
                            </form>
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
            {dataSearch.map((menu, masukKeranjang) => (
              <Col>
                <Card
                  className="mx-1 mb-5 border-0 "
                  key={menu._id}
                  style={{ color: "grey" }}
                >
                  <Link
                    to={`/Detailmenu/${menu.idMenu}`}
                    state={{ url: urlParams }}
                  >
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
        {active === "thirdcard" && (
          <Row xs={2} md={4} className="g-0">
            {dataSearch.map((menu, masukKeranjang) => (
              <Col>
                <Card
                  className="mx-1 mb-5 border-0 "
                  key={menu._id}
                  style={{ color: "grey" }}
                >
                  <Link
                    to={`/Detailmenu/${menu.idMenu}`}
                    state={{ url: urlParams }}
                  >
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

        {active === "fourthcard" && (
          <Row xs={2} md={4} className="g-0">
            {post?.data.map((menu, masukKeranjang) => (
              <Col>
                <Card
                  className="mx-1 mb-5 border-0 "
                  key={menu._id}
                  style={{ color: "grey" }}
                >
                  <Link
                    to={`/Detailmenu/${menu.idMenu}`}
                    state={{ url: urlParams }}
                  >
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
        {/* <div className="button-hide">
          <p onClick={showmoritem}>
            <text onClick={() => toggleShow(!toggleshow)}>
              {show ? "" : "More Menu"}
            </text>
          </p>
          <p onClick={showmoritems}>
            <text onClick={() => toggleShow(!toggleshow)}>
              {show ? "Less Menu " : ""}
            </text>
          </p>
          <p onClick={showmoritems}>
            <text onClick={() => toggleShow(!toggleshow)}></text>
          </p>
        </div> */}
      </div>

      <div>
        <div>
          <div>
            {arr[0]?.dataPesanan?.map((d, i) => {
              return (
                <>
                  <div className="delete_button">
                    <AiOutlineDelete
                      style={{ cursor: "pointer" }}
                      class="mx-4"
                      onClick={() => {
                        removeMe(d.namaMenu);
                        notifDelete(d.namaMenu);
                        deleteItem(d.idMenu);
                      }}
                    />
                  </div>
                  <table style={{ maxHeight: "20vw" }} className="table2">
                    <td
                      className="tittle"
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      <ModalCustomKeranjang
                        menuList={d}
                        onSubmit={onSubmit}
                        notifsukses={notifsukses}
                        menu={d}
                        setInidata={setInidata}
                      />
                    </td>

                    <div className="decrease_button">
                      <BsDashCircle
                        style={{ cursor: "pointer" }}
                        class="mx-4"
                        onClick={() => {
                          removeMe(d.namaMenu);
                          notifDelete(d.namaMenu);
                          minItem(d.idMenu);
                        }}
                      />
                    </div>

                    <td style={{ textAlign: "center" }}> {d.qty}x </td>
                    <div className="increase_button">
                      <BsPlusCircle
                        style={{ cursor: "pointer" }}
                        class="mx-5"
                        onClick={() => {
                          removeMe(d.namaMenu);
                          notifsukses(d);
                          addItem(d.idMenu);
                        }}
                      />
                    </div>
                    <td> Rp. {numberWithCommas(d.hargaMenu * d.qty)},00</td>
                    <td className="opration"></td>
                  </table>
                </>
              );
            })}
          </div>
          <p>
            <table
              style={{ maxHeight: "20vw", fontSize: "15px" }}
              className="table2"
            >
              <td class="fw-bold"> Total </td>
              <td></td>
              <td class="fw-bold"> Rp. {data.totalHarga}</td>
            </table>
          </p>
        </div>

        <Link to={`/KonfirmasiPesanan/` + urlParams} state={{ url: urlParams }}>
          <button className="button-konfir" onClick={""}>
            Konfirmasi Pemesanan
          </button>
        </Link>
        <div></div>
      </div>
    </>
  );
}

export default Navbarcomp;

export const ModalCustomKeranjang = ({
  menuList,
  onSubmit,
  notifsukses,
  menu,
  setInidata,
}) => {
  const [show, setShow] = useState(false);
  let [count, setCount] = useState(0);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div onClick={handleClick}>{menuList.namaMenu}</div>
      {show && (
        <Modal
          show={show}
          onHide={handleClick}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <br></br>
          <CgArrowLeftO class="mx-4" size={35} onClick={handleClick} />
          <Modal.Body>
            <img src={Gambarburger} alt="gambarpizza" className="gambarmodal" />
            <div className="textmodal">
              {menuList.namaMenu}
              <p></p>
            </div>
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

                    <strong>{menuList.qty}</strong>
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
                Edit Pesanan
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export const ModalCustom = ({
  menuList,
  onSubmit,
  notifsukses,
  menu,
  setInidata,
}) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div class="text text-end text-dark">
        <Button
          className="buttonplus"
          variant="text"
          onClick={handleClick}
          style={{ paddingTop: "15px", paddingRight: "1px" }}
        >
          <BsPlusCircle></BsPlusCircle>
        </Button>
      </div>

      {show && (
        <Modal
          show={show}
          onHide={handleClick}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <br></br>
          <CgArrowLeftO class="mx-4" size={35} onClick={handleClick} />
          <Modal.Body>
            <img src={Gambarburger} alt="gambarpizza" className="gambarmodal" />
            <div className="textmodal">
              {menuList.namaMenu}
              <p></p>
            </div>
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

                    <strong>1</strong>
                  </Form.Group>

                  <Form.Label>Tambahkan Catatan : </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="col text-center">
              <form action="" id="login" method="post" onSubmit={onSubmit}>
                <button
                  className="button-konfir_modal"
                  type="submit"
                  variant="text"
                  onClick={() => {
                    notifsukses(menu);
                    setInidata(menu);
                  }}
                >
                  Tambah Pesanan
                </button>
              </form>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
