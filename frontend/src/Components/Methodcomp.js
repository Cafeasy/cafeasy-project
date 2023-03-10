import "../Style/Methodpage.css"
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import React from 'react'; 
import Dropdownpage from "./Dropdowncomp";

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
                        <i></i>
                    </button>
                </div>
            </div>

            <div>
                <div className="dropdown-box">
                    <Dropdownpage placeHolder="Cash/Tunai" />
                </div>
            </div>
            
            <div>
                <div className="dropdown-box">
                    <Dropdownpage placeHolder="Cash/Tunai" />
                </div>
            </div>
        </div>
    )
};


export default Methodcomp