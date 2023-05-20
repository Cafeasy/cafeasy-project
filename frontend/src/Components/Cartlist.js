import { useEffect, useState } from "react";
import "../Style/Cartlist.css";
import { BsDashCircle } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import { BsPlusCircle } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CgArrowLeftO } from "react-icons/cg";
import { CgRemove } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import Gambarburger from "../Photo/Burger.jpeg";
import Swal from "sweetalert2";

function CartList({ cart }) {
  const [CART, setCART] = useState([]);

  useEffect(() => {
    setCART(cart);
  }, [cart]);
  const totalbayar = CART.map((item) => item.hargaMenu * item.quantity).reduce(
    (total, value) => total + value,
    0
  );

  const notifDelete = (value) => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Menghapus Keranjang " + value,
      icon: "success",
      button: false,
      timer: 1500,
    });
  };

  const removeMe = (index) => {
    const temp = [...CART];
    temp.splice(index, 1);
    setCART(temp);
  };

  return (
    <div>
      {CART?.map((cartItem, cartindex) => {
        return (
          <span>
            <div className="delete_button">
              <BsDashCircle
                style={{ cursor: "pointer" }}
                class="mx-4"
                onClick={() => {
                  removeMe(cartItem.namaMenu);
                  notifDelete(cartItem.namaMenu);
                }}
              />
            </div>

            <ModalCustom menuList={cartItem} />
          </span>
        );
      })}
      <p>
        {" "}
        <ul class="fw-bold">
          <ul style={{ textAlign: "end" }}></ul>Total.
          {CART.map((item) => item.hargaMenu * item.quantity).reduce(
            (total, value) => total + value,
            0
          )}
        </ul>
      </p>
    </div>
  );
}

const ModalCustom = ({ menuList }) => {
  const [menus, setMenus] = useState([]);
  const [show, setShow] = useState(false);
  let [count, setCount] = useState(1);
  const notifsukses = () => {
    Swal.fire({
      title: "Sukses ",
      text: "Sukses Mengubah Keranjang " + menuList.namaMenu,
      icon: "success",
      button: false,
      timer: 1500,
    });
  };
  function incrementCount(value) {
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
  const totalhargas = menuList.hargaMenu * count;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <>
      <table style={{ maxHeight: "20vw" }} className="table2">
        <td
          className="tittle"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          {" "}
          {menuList.namaMenu}{" "}
        </td>
        <td style={{ textAlign: "center" }}> {count}x </td>
        <td> Rp. {numberWithCommas(totalhargas)},00</td>
      </table>

      {show && (
        <Modal
          show={show}
          onHide={handleClick}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <br></br>
          <CgArrowLeftO
            class="mx-4"
            size={35}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          <Modal.Body>
            <img src={Gambarburger} alt="gambarpizza" className="gambarmodal" />
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
                  <Form.Control as="textarea" rows={3} />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="col text-center">
              <button
                className="button-konfir_modal"
                onClick={() => {
                  notifsukses();
                  handleClick();
                }}
              >
                Tambah Pesanan
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CartList;
