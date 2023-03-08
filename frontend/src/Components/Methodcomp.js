import "../Style/Methodpage.css"
import { IoChevronBackCircleOutline } from "react-icons/io5";
import React from 'react'; 

const Methodcomp = () => {
    return (
        <div className="metode-pembayaran">
            <div className="logo-back">
                <h1><IoChevronBackCircleOutline/></h1>
            </div>

            <div>
                <button className="disable-button" disabled="true">PILIH METODE PEMBAYARAN</button>
            </div>
        </div>
    )
}
























export default Methodcomp