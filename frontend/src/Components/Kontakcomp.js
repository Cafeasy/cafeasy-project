import "../Style/Confirmpage.css";
import "../Style/Kontakpage.css";
import styles from "../Style/Bantuanpage.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Kontakcomp = (props) => {
    const menus = props.menu;
    const location = useLocation();
    const { url } = location.state;
  return (
    <div className="App">
    <br></br>
    <br></br>
    <div>
      <br></br>
      <div class="d-grid col-9 mx-auto mt-6">
        <button
          type="submit"
          className="button-konfir-pesanan"
          disabled="true"
        >BANTUAN</button>
      </div>
    </div>
    <form>
        <h4>Kontak Kami</h4>
        <h6>Kontak kami jika terdapat kendala ataupun menanyai hal apapun</h6>
        <br></br>

        <div className="Logbutton">
          <div class="d-grid gap-20 col-10 mx-auto">
          <label></label>
          <input
            type="text"
            className="form-control"
            placeholder="Nama"
          />
          </div>
        </div>
        <br></br>

        <div className="Logbutton">
         <div class="d-grid gap-20 col-10 mx-auto">
            <label></label>
            <input type="text" className="form-control" placeholder="Email" />
          </div>
        </div>
        <br></br>

        <div className="Logbutton">
        <div class="d-grid gap-20 col-10 mx-auto">
          <label></label>
          <input
            type="email"
            className="form-control"
            placeholder="Perusahaan (Opsional)"
          />
          </div>
        </div>
        <br></br>

        <div className="Logbutton">
          <div class="d-grid gap-20 col-10 mx-auto">
            <label></label>
            <input
              type="password"
              className="form-control"
              placeholder="Pesan"
            />
          </div>
        </div>
      </form>

    <div>
        <br></br>
        <Link to={`/Berandapage/${url}`}>
        <button className="button-proses-pembayaran">Kembali</button>
        </Link>
      </div>
    </div>
  );
};

export default Kontakcomp;
