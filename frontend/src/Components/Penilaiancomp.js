import "../Style/Confirmpage.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "https://app.sandbox.midtrans.com/snap/snap.js";
import { Rating } from "react-simple-star-rating";
import { useId } from "react";

const Penilaiancomp = (props) => {
  const params = useParams();
  const location = useLocation();
  const { url } = location.state;
  const urlParams = params.idUser;
  const [rating, setRating] = useState(0);
  const postTextAreaId = useId();
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

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
            Berikan Penilaian
          </button>
        </div>
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: "bold",

          textAlign: "center",
        }}
      >
        Makanan / Minuman Secara Keseluruhan
      </div>
      <div className="App">
        <Rating
          onClick={handleRating}

          /* Available Props */
        />
      </div>
      <br></br>
      <label
        style={{
          fontSize: "15px",
          fontWeight: "bold",

          textAlign: "center",
        }}
        htmlFor={postTextAreaId}
      >
        Berikan Ulasan:
      </label>
      <div>
        <textarea id={postTextAreaId} name="postContent" rows={4} cols={40} />
      </div>
      <div>
        <br></br>

        <Link to={`/Berandapage/${url}`}>
          <button type="button" className="button-proses-pembayaran">
            Kirim
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Penilaiancomp;
