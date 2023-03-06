import Logoputih from '../Photo/Logoputih.png'
import "../Style/Landingpage.css"
import { useNavigate } from 'react-router-dom';
import * as React from "react";



const Landingcomp = () => {
    const time = 3000;
    const navigate = useNavigate();
    const [counter, setCounter] = React.useState(3);

    setInterval(() => setCounter(counter - 1), 1000);

    React.useEffect(() => {


        setTimeout(() => {

            navigate('/Loginpage', { replace: true });
        }, time
        );
    }, []);

    return (
        <div>
            <div className="landing">
                <div className="gambars">
                    <img src={Logoputih}></img>
                </div>
                <div className="text1" >CAFEASY</div>
                <div className="text2">from hallodeck</div>
                <div className="text5">Redirect to Login Page in {counter} ....</div>
                <div className="text4">© 2022-2023 CAFEASY All Rights Reserved.</div>

            </div>


        </div>
    )
}






export default Landingcomp