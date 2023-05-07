import Kontakcomp from "../Components/Kontakcomp";
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
function Kontakpage(props) {
  const [menu, setMenu] = useState([]);
  const idUser = props.idUser;

  const idMenu = useParams();
  const url = `${process.env.REACT_APP_API_URL}/Kontakpage/${idMenu.idMenu}`;

  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        const responseAPI = result.data;
        const data = responseAPI.data;
        data.map((menus) => {
          setMenu(menus);
        });

        console.log("data API ada", result.data);
      })
      .catch((err) => {
        console.log("Data tidak berhasil dipanggil");
      });
  }, []);

  return <Kontakcomp menu={menu} idUser={idUser} />;
}

export default Kontakpage;
