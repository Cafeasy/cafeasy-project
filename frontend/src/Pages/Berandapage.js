import Berandacomp from "../Components/Berandacomp"
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

import { useParams } from 'react-router-dom';


function Berandapage() {
    const [user, setUser] = useState(null);
    const params = useParams()
    const idUser = params.idUser
    const getUser = async () => {
        try {

            if (idUser.substring(0, 4) === "gusr") {
                const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
                const { data } = await axios.get(url, { withCredentials: true });
                setUser(data.user._json);
                console.log("data api ada", data)

            } else if (idUser.substring(0, 4) === "nusr") {

                axios.get(`${process.env.REACT_APP_API_URL}/getCustomerById/` + idUser)
                    .then((result) => {
                        const responseAPI = result.data.data;
                        setUser(responseAPI);
                        console.log("data API ada", responseAPI.data);
                    })
                    .catch((err) => {
                        console.log("Data tidak berhasil dipanggil");
                    });

            }

        } catch (err) {
            const url = `${process.env.REACT_APP_API_URL}/Loginpage`;
            redirect(url);
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);


    return (
        <Berandacomp user={user} />
    )
}

export default Berandapage