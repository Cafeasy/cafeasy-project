import React from "react"
import Navbarpage from "../Pages/Navbarpage"
import Sliderpage from "../Pages/Slidergambar"
import Maincoursepage from "../Pages/Maincoursepage"
import { Link } from 'react-router-dom'
import "../Style/Slidergambar.css"
import Slidercomp from "./Slidercomp"
import Navbarmenu from "../Pages/Navbarmenu"


const Berandacomp = () => {
    return (
        <div>
            <Navbarpage />
            <Sliderpage />
            <Navbarmenu />
            <Maincoursepage />

        </div>
    )

}

export default Berandacomp