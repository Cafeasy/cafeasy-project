import "../Style/Confirmpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "https://app.sandbox.midtrans.com/snap/snap.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const Confirmcomp = (props) => {
  const [show, setShow] = useState(false);
  const [catatankrj, setCatatankrj] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [count, setCount] = useState(0);

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
  const handleClick = () => {
    setShow(!show);
  };
  const notifsukses = (item) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Mengedit Keranjang " + item.namaMenu,
      icon: "success",
      button: false,
      timer: 1000,
    });
  };
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

  const payment = async (e) => {
    let parameter;
    let idOrder;
    {
      data?.result.map(
        (newData) => (
          (parameter = {
            transaction_details: {
              order_id: newData.idKeranjang,
              gross_amount: data.totalHarga,
            },
            credit_card: {
              secure: true,
            },
            customer_details: {
              first_name: newData.namaPelanggan,
              last_name: "",
            },
          }),
          (idOrder = newData.idKeranjang)
        )
      );
    }
    console.log(idOrder);

    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/midtransPayment/`, parameter)
      .then(async (res) => {
        const responseAPI = res.data.data;

        const newIdOrder = idOrder;
        console.log(newIdOrder);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/postTransaksi/${idOrder}`
        );
        window.snap.pay(responseAPI, {
          onSuccess: () => {
            axios
              .put(
                `${
                  process.env.REACT_APP_API_URL
                }/updateStatusBayar/${newIdOrder.toString()}`
              )
              .then(() =>
                paymentSukses("/Statuspage/" + urlParams, {
                  state: { idOrder: newIdOrder },
                })
              );
          },
          onPending: () => {
            axios
              .put(
                `${
                  process.env.REACT_APP_API_URL
                }/updateStatusBayar/${newIdOrder.toString()}`
              )
              .then(() =>
                paymentSukses("/Statuspage/" + urlParams, {
                  state: { idOrder: newIdOrder },
                })
              );
          },
          onError: () => {
            axios
              .put(
                `${
                  process.env.REACT_APP_API_URL
                }/updateStatusBayar/${newIdOrder.toString()}`
              )
              .then(() =>
                paymentSukses("/Statuspage/" + urlParams, {
                  state: { idOrder: newIdOrder },
                })
              );
          },
          onClose: () => {
            axios
              .put(
                `${
                  process.env.REACT_APP_API_URL
                }/updateStatusBayar/${newIdOrder.toString()}`
              )
              .then(() =>
                paymentSukses("/Statuspage/" + urlParams, {
                  state: { idOrder: newIdOrder },
                })
              );
          },
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
      <div class="container">
        <table
          style={{
            width: "95%",
            textAlign: "left",
            marginLeft: "3%",
            border: "1px solid #BFBFBF",
          }}
        >
          <tr style={{ fontSize: "15px", fontWeight: "bolder  " }}>
            <td>Menu yang dipilih</td>
            <td style={{ textAlign: "center" }}>Kuantitas</td>
            <td>Subtotal </td>
          </tr>

          {arr[0]?.dataPesanan?.map((item) => (
            <>
              <tr className="text-title3">
                <td style={{ width: "45%" }}>
                  {" "}
                  <img
                    src={item.imageUrl}
                    alt="gambarpizza"
                    className="gambarkonfir"
                  />
                  <br></br>
                  {item.namaMenu}{" "}
                  <td style={{ opacity: "0.5", fontSize: "10px" }}>
                    <div className="text-catatan"> {item.catatanPelanggan}</div>
                  </td>
                </td>

                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {item.qty}x
                </td>
                <td>Rp.{item.hargaMenu * item.qty}</td>
              </tr>
              <tr className="text-title3">
                <td
                  style={{
                    padding: "5px",
                    paddingLeft: "5%",
                    width: "40%",
                    opacity: "0.5",
                    fontSize: "12px",
                    color: "red",
                    textDecoration: "underline",
                    position: "absolute",
                    marginTop: "-20px",
                    marginLeft: "65 px",
                  }}
                >
                  <ModalCustomKeranjang
                    menuList={item}
                    notifsukses={notifsukses}
                    menu={item}
                    updateCatatan={updateCatatan}
                    setCatatankrj={setCatatankrj}
                    addItem={addItem}
                    minItem={minItem}
                  />
                </td>
              </tr>
            </>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td>Total </td>
            <td></td>
            <td>Rp. {data.totalHarga}</td>
          </tr>
          <tr>
            <td> </td>
          </tr>
        </table>
      </div>
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

export const ModalCustomKeranjang = ({
  menuList,
  onSubmit,
  menu,
  setInidata,
  updateCatatan,
  setCatatankrj,
  addItem,
  minItem,
}) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const notifDelete = (value) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Menghapus Keranjang " + value,
      icon: "success",
      button: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div style={{}} onClick={handleShow}>
        Catatan{" "}
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
                    <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
                      <AiFillMinusCircle
                        style={{ cursor: "pointer" }}
                        size={18}
                        opacity={0.5}
                        color="black"
                        class="mx-4"
                        onClick={() => {
                          notifDelete(menuList.namaMenu);
                          minItem(menuList.idMenu);
                        }}
                      />

                      <strong>{menuList.qty}</strong>

                      <AiFillPlusCircle
                        style={{
                          cursor: "pointer",
                        }}
                        size={18}
                        color="#1f2937"
                        class="mx-4"
                        onClick={() => {
                          notifsukses(menuList);
                          addItem(menuList.idMenu);
                        }}
                      />
                    </div>
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
