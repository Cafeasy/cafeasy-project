import Detailmenucomp from "../Components/Detailmenucomp"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
const Detailmenupage = () => {
    const [menu, setMenu] = useState([]);
    const idMenu = useParams();
    const url = `${process.env.REACT_APP_API_URL}/DetailMenu/${idMenu.idMenu}`;

    useEffect(() => {
        axios
            .get(url)
            .then((result) => {
               
                const responseAPI = result.data;
                setMenu(responseAPI.data);
                console.log("data API ada", result.data);
            })
            .catch((err) => {
                console.log("Data tidak berhasil dipanggil");
            });
    }, []);
 

    return (


        <Detailmenucomp menu={menu} />
    )
}

export default Detailmenupage
