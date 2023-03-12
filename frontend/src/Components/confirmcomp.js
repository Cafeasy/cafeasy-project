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

            <div>
            <table>
                <tr className="text-ganti">
                <th>Ganti</th>
                </tr>

                <tr className="text-title1">
                <td>American waffle</td>
                </tr>
                
                <tr className="text-title2">
                <td>1x</td>
                </tr>
                
                <tr className="text-title3">
                <td>Rp 20.000,00</td>
                </tr>

                <tr className="text-title4">
                <th>Belgian waffle</th>
                </tr>

                <tr className="text-title5">
                <th>1x</th>
                </tr>

                <tr className="text-title6">
                <th>Rp 20.000,00</th>
                </tr>

                <tr className="text-title7">
                <th>Diskon</th>
                </tr>

                <tr className="text-title8">
                <th>(Rp 5.000,00)</th>
                </tr>

                <tr className="text-title9">
                <th>Sub Total</th>
                </tr>

                <tr className="text-title10">
                <th>Biaya Pelayanan</th>
                </tr>

                <tr className="text-title11">
                <th>Rp 2.000,00</th>
                </tr>

                <tr className="text-title12">
                <th>Take Away</th>
                </tr>

                <tr className="text-title13">
                <th>Rp 2.000,00</th>
                </tr>

                <tr className="text-title14">
                <th>Rp 25.000,00</th>
                </tr>

                <tr className="text-title15">
                <th>Total</th>
                </tr>

                <tr className="text-title16">
                <th>Rp 29.000,00</th>
                </tr>
            </table>
            </div>

            <div>
                <button className="enable-button" disabled="true">Proses Pembayaran</button>
                <i></i>
            </div>
        </div>

    )
}

export default Confirmcomp