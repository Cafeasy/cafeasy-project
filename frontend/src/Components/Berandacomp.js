import React from "react"
import Navbarpage from "../Pages/Navbarpage"
import Sliderpage from "../Pages/Slidergambar"

import "../Style/Slidergambar.css"

import Navbarmenu from "../Pages/Navbarmenu"


function Berandacomp(props) {
    return (
        <div>
            <Navbarpage user={props.user} />
            <Sliderpage />
            <Navbarmenu />


        </div>
    )

}

export default Berandacomp