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
                <div class="wrap">
                <div class="search">
                    <input type="text-search" class="searchTerm" placeholder="Search...."></input>
                    <button type="submit" class="searchButton">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
























export default Methodcomp