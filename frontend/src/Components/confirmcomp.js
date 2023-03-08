import "../Style/Confirmpage.css"
import { IoChevronBackCircleOutline } from "react-icons/io5";
import React from 'react'; 

const Confirmcomp = () => {

    return(
        <div className="konfirmasi-pesanan">
            <div className="logo-back">
                <h1><IoChevronBackCircleOutline/></h1>
            </div>

            <div>
                <button className="disable-button" disabled="true">KONFIRMASI PEMESANAN</button>
            </div>

            <div className="textsatu">Ganti</div>
            <div className="textdua">American waffle</div>
            <div className="texttiga">1x</div>
            <div className="textempat">Rp 20.000,00</div>
            <div className="textlima">Belgian waffle</div>
            <div className="textenam">1x</div>
            <div className="texttujuh">Rp 20.000,00</div>
            <div className="textdelapan">Diskon</div>
            <div className="textsembilan">(Rp 5.000,00)</div>
            <div className="textsepuluh">Sub Total</div>
            <div className="textsebelas">Biaya Pelayanan</div>
            <div className="textduabelas">Rp 2.000,00</div>
            <div className="texttigabelas">Take Away</div>
            <div className="textempatbelas">Rp 25.000,00</div>
            <div className="textlimabelas">Rp 2.000,00</div>
            <div className="textenambelas">Total</div>
            <div className="texttujuhbelas">Rp 29.000,00</div>        

            <div>
                <button className="enable-button" disabled="true">Proses Pembayaran</button>
            </div>
        
        </div>

    )
}

export default Confirmcomp