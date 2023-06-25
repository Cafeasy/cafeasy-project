import "../Style/Navbar.css";
import Swal from "sweetalert2";
import Logoputih from "../Photo/LogoOnly.png";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Gambarburger from "../Photo/Burger.jpeg";
import Gambarpizza from "../Photo/Pizza.jpeg";
import Gambarwaffels from "../Photo/Waffles.jpeg";
import "../Style/Maincourse.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";
import "../Style/Slidergambar.css";
import "../Style/Navbar.css";
import { useNavigate } from "react-router-dom";
import CartList from "./Cartlist";
import { Link } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CgArrowLeftO } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import { useParams } from "react-router-dom";

function Navbarcomp(props) {
  const params = useParams();
  const urlParams = params.idUser;

  const user = props.user;

  const [menus, setMenus] = useState([]);
  useEffect(() => {
    // console.log("ini nama user : ", user?.name);
    axios
      .get(`${process.env.REACT_APP_API_URL}/ListMenu`)
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
      qty: count,
      catatanPelanggan: catatan,
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
  let [catatankrj, setCatatankrj] = useState("");

  const updateCatatan = (value) => {
    const post = {
      catatanPelanggan: catatankrj,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateCartCatatanPelanggan/` +
          urlParams +
          "/" +
          value.idMenu,
        post
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const minItem = (value) => {
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

  let [kateg, setKateg] = useState("0");
  const datakateg = (value) => {
    setKateg(value);
    setActive(value);
  };

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ListMenuByCategory/` + kateg)
      .then((response) => {
        setPost(response.data);
      });
  }, [post]);

  const [kategorimenu, setKategorimenu] = useState([]);
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/kategoriMenu`)
      .then((result) => {
        setKategorimenu(result.data);
      })
      .catch((error) => console.log(error));
  }, [kategorimenu]);

  const [show, setShow] = useState(false);
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
  const [active, setActive] = useState("All Menu");

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

  const [gambar, setGambar] = useState("");
  let [catatan, setCatatan] = useState("");

  let [count, setCount] = useState(1);
  function incrementCount() {
    if (count < 50) {
      setCount(count + 1);
    }
  }
  function decrementCount() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  const removeMe = (index) => {};

  const [shows, setShows] = useState(true);

  const handleClose = () => setShows(false);
  const handleShow = () => setShows(true);

  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  let arr = data.result ?? [];
  let ktgr = kategorimenu.data ?? [];
  console.log(message);
  return (
    <>
      <div className="">
        <div>
          <Modal
            show={shows}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Body>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Masukan Nomor Meja :
                    </label>
                    <input
                      required
                      onChange={handleChange}
                      type="number"
                      class="form-control"
                    ></input>
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                variant="primary"
                disabled={message === ""}
                onClick={handleClose}
              >
                Understood
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
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

                    <Nav.Link
                      as={Link}
                      to={`/RiwayatPesanan/` + urlParams}
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
      <br></br>

      <div>
        <div class="navbar-container">
          <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
            <ul>
              <li fill class="nav-link active-link">
                <a onClick={() => setActive("All Menu")}>All Menu</a>
                <div class="underline"></div>
              </li>
            </ul>{" "}
            {ktgr.map((isi, index) => (
              <>
                <ul>
                  <li fill class="nav-link active-link">
                    <a onClick={() => datakateg(isi.namaKategori)}>
                      {isi.namaKategori}
                    </a>
                    <div class="underline"></div>
                  </li>
                </ul>
              </>
            ))}
          </div>
          <br></br>

          {active === "All Menu" && (
            <Row xs={2} md={4} className="g-1">
              {dataSearch.map((menu, masukKeranjang) => (
                <Col>
                  <div class="shadow-sm  mb-1 mx-1 bg-white rounded">
                    <Card
                      className="mx-2 mb-3 border-0 "
                      key={menu.idMenu}
                      data-example={menu.namaMenu}
                      masukKeranjang={menu.masukKeranjang}
                    >
                      <Link
                        to={`/Detailmenu/${menu.idMenu}`}
                        state={{ url: urlParams }}
                      >
                        <Card.Img
                          variant="top"
                          src={menu.imageUrl}
                          className="gambarnya"
                        />
                      </Link>
                      <Card.Body>
                        <div style={{ textAlign: "left" }}>
                          {" "}
                          <Card.Title className="menu-harga">
                            {menu.hargaMenu}
                          </Card.Title>
                          <Card.Title
                            className="menu-tittle"
                            style={{ textIndent: "1px" }}
                          >
                            {menu.namaMenu}
                          </Card.Title>
                        </div>

                        <div className="rate">
                          <div class="text text-end text-warning">
                            <BsStarFill size="10px"></BsStarFill>
                            <BsStarFill size="10px"></BsStarFill>
                            <BsStarFill size="10px"></BsStarFill>
                            <BsStarFill size="10px"></BsStarFill>
                            <BsStarFill size="10px"></BsStarFill>
                          </div>
                        </div>

                        <div>
                          {" "}
                          <Card.Text
                            className="menu-deskripsi"
                            style={{
                              textIndent: "1px",

                              fontWeight: "50px",
                            }}
                          >
                            {menu.deskripsiMenu}
                          </Card.Text>
                          <ModalCustom
                            menuList={menu}
                            onSubmit={onSubmit}
                            notifsukses={notifsukses}
                            menu={menu}
                            setInidata={setInidata}
                            incrementCount={incrementCount}
                            decrementCount={decrementCount}
                            count={count}
                            setCatatan={setCatatan}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {ktgr.map((isi, index) => (
            <>
              {active === isi.namaKategori && (
                <Row xs={2} md={4} className="g-1">
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
                    .map((menu, masukKeranjang) => (
                      <Col>
                        <div class="shadow-sm  mb-1 mx-2 bg-white rounded">
                          <Card
                            className="mx-2  mb-3 border-0 "
                            key={menu.idMenu}
                            data-example={menu.namaMenu}
                            masukKeranjang={menu.masukKeranjang}
                          >
                            <Link
                              to={`/Detailmenu/${menu.idMenu}`}
                              state={{ url: urlParams }}
                            >
                              <Card.Img
                                variant="top"
                                src={menu.imageUrl}
                                className="gambarnya"
                              />
                            </Link>
                            <Card.Body>
                              <div style={{ textAlign: "left" }}>
                                {" "}
                                <Card.Title className="menu-harga">
                                  {menu.hargaMenu}
                                </Card.Title>
                                <Card.Title
                                  className="menu-tittle"
                                  style={{ textIndent: "1px" }}
                                >
                                  {menu.namaMenu}
                                </Card.Title>
                              </div>

                              <div className="rate">
                                <div class="text text-end text-warning">
                                  <BsStarFill size="10px"></BsStarFill>
                                  <BsStarFill size="10px"></BsStarFill>
                                  <BsStarFill size="10px"></BsStarFill>
                                  <BsStarFill size="10px"></BsStarFill>
                                  <BsStarFill size="10px"></BsStarFill>
                                </div>
                              </div>

                              <div>
                                {" "}
                                <Card.Text
                                  className="menu-deskripsi"
                                  style={{ textIndent: "1px" }}
                                >
                                  {menu.deskripsiMenu}
                                </Card.Text>
                                <ModalCustom
                                  menuList={menu}
                                  onSubmit={onSubmit}
                                  notifsukses={notifsukses}
                                  menu={menu}
                                  setInidata={setInidata}
                                  incrementCount={incrementCount}
                                  decrementCount={decrementCount}
                                  count={count}
                                  setCatatan={setCatatan}
                                />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      </Col>
                    ))}
                </Row>
              )}
            </>
          ))}
        </div>
      </div>

      <div>
        <div>
          <div>
            {arr[0]?.dataPesanan?.map((d, i) => {
              return (
                <>
                  <div className="delete_button">
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      class="mx-4"
                      size={18}
                      color="black"
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
                        updateCatatan={updateCatatan}
                        setCatatankrj={setCatatankrj}
                      />
                    </td>

                    <div className="decrease_button">
                      <AiFillMinusCircle
                        style={{ cursor: "pointer" }}
                        size={18}
                        opacity={0.5}
                        color="black"
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
                      <AiFillPlusCircle
                        style={{
                          cursor: "pointer",
                          color: "#1f2937",
                        }}
                        size={18}
                        class="mx-5"
                        onClick={() => {
                          removeMe(d.namaMenu);
                          notifsukses(d);
                          addItem(d.idMenu);
                        }}
                      />
                    </div>
                    <td> Rp. {numberWithCommas(d.hargaMenu * d.qty)}</td>
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
          <button
            className="button-konfir"
            disabled={arr[0]?.dataPesanan.length === 0}
          >
            Konfirmasi Pemesanan
          </button>
        </Link>
      </div>
    </>
  );
}

export default Navbarcomp;

export const ModalCustomKeranjang = ({
  menuList,
  onSubmit,
  menu,
  setInidata,
  updateCatatan,
  setCatatankrj,
}) => {
  const [show, setShow] = useState(false);
  let [count, setCount] = useState(0);

  const handleClick = () => {
    setShow(!show);
  };
  const notifsukses = (menuList) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Mengedit Keranjang " + menuList.namaMenu,
      icon: "success",
      button: false,
      timer: 1000,
    });
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
            <img
              src={menu.imageUrl}
              alt="gambarpizza"
              className="gambarmodal"
            />
            <div className="textmodal">
              {menuList.namaMenu}
              <p></p>
            </div>
            {/* <div className="textmodal_deskripsi">{menuList.deskripsiMenu}</div> */}
            <div className="textmodal_harga">{menuList.hargaMenu}</div>
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
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={menuList.catatanPelanggan}
                    onChange={(e) => setCatatankrj(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="col text-center">
              <button
                className="button-konfir_modal"
                onClick={() => {
                  handleClick();
                  updateCatatan(menuList);
                  notifsukses(menuList);
                }}
              >
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
  incrementCount,
  decrementCount,
  count,
  setCatatan,
}) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const tambahMenu = () => {
    setTimeout(() => {
      setShow(!show);
    }, 1000);
  };

  return (
    <>
      {/* <div class="text text-end text-dark">
        <Button
          className="buttonplus"
          variant="text"
          onClick={handleClick}
          style={{
            paddingTop: "21px",
            paddingRight: "1px",
            color: "red",
          }}
        >
          asdasd
        </Button>
      </div> */}

      <button
        className="oval"
        onClick={handleClick}
        style={{ whiteSpace: "nowrap" }}
      >
        <BsFillCartPlusFill size={12}></BsFillCartPlusFill> Keranjang
      </button>
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
            <img
              src={menuList.imageUrl}
              alt="gambarpizza"
              className="gambarmodal"
            />
            <div className="textmodal">
              {menuList.namaMenu}
              <p></p>
            </div>
            {/* <div className="textmodal_deskripsi">{menuList.deskripsiMenu}</div> */}
            <div className="textmodal_harga">{menuList.hargaMenu}</div>
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
                  <Form.Control
                    onChange={(e) => setCatatan(e.target.value)}
                    as="textarea"
                    rows={3}
                  />
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
                    tambahMenu();
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
