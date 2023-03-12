import { IoChevronBackCircleOutline, IoSearch } from "react-icons/io5";
import Dropdownpage from "./Dropdowncomp";
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
                        <i><IoSearch/></i>
                    </button>
                </div>
            </div>

            <div>
                <Dropdownpage />
            </div>

        </div>
    )
};


export default Methodcomp