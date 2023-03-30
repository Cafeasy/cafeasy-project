import Logohitam from '../Photo/Logohitam.png'
import { Link } from 'react-router-dom';
import "../Style/Loginpage.css"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto-js/sha256';
import { FcGoogle } from 'react-icons/fc';

function Logincomp() {
    const id = (Math.random()).toString(10).substring(2)
    const idPelanggan = "nusr" + id;
    const beranda = useNavigate();
    const [name, setUser] = useState('');

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };
    const submitUser = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/customer`, {
            id: idPelanggan.toString(),
            name: name.toString()
        });
        beranda('/Berandapage/' + idPelanggan);
    }
    return (
        <div>

            <div className="login">
                <div className="gambarlogin">
                    <img src={Logohitam} alt="logo-cafeasy"></img>
                </div>
                <div className="text1" >CAFEASY</div>
                <div className="text3">© 2022-2023 CAFEASY All Rights Reserved.</div>

                    <div className="Logbutton">
                        <div class="d-grid gap-10 col-9 mx-auto">
                            <label for="usr">Nama</label>
                            <input value={name} onChange={(e) => setUser(e.target.value)} type="text" id="name" name="name" className="form-control" />

                        <div class="form-check form-switch ">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label class="form-check-label" for="flexSwitchCheckDefault">ingat saya</label>
                        </div>
                    </div>

                    <div className="Logbutton">
                        <div class="d-grid  col-9 mx-auto mt-6">
                            <button type='submit' class='btn btn-dark' onClick={submitUser} >
                                Masuk
                            </button>
                            <div className="Loginput text-center  ">atau</div>
                            <button class="shadow-sm btn btn-light rounded-pill" type="button" onClick={googleAuth}><FcGoogle>Google</FcGoogle></button>

                        </div>

                    </div>

                </div>


            </div>

        </div>
    );

}

export default Logincomp