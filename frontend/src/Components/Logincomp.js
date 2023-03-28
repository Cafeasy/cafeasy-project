import Logohitam from '../Photo/Logohitam.png'
import "../Style/Loginpage.css"
import Button from 'react-bootstrap/Button';


import {  FcGoogle} from 'react-icons/fc';

function Logincomp() {

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };

    const submit = () => {

        window.open(`${process.env.REACT_APP_API_URL}/custLogReg`, "_self");
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
                        <input type="text" class="form-control" id="usr" />

                      <br></br>
                    </div>

                </div>
            
                <div className="Logbutton">
                    <div class="d-grid  col-9 mx-auto mt-6">
                        <Button type='button' onClick={submit} button class='btn btn-dark'>
                            Masuk
                        </Button>
                        <div className="Loginput text-center  ">atau</div>
                        <button class="shadow-sm btn btn-light rounded-pill" type="button" onClick={googleAuth}><FcGoogle>Google</FcGoogle></button>
                        
                    </div>

                </div>


            </div>

        </div>
    );

}

export default Logincomp