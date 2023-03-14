import Berandacomp from "../Components/Berandacomp"
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Berandapage(props) {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            if (data != null) {
                setUser(data.user._json);
                console.log(data)
            } else {
                setUser(props.user);
                console.log(props.user.name);
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