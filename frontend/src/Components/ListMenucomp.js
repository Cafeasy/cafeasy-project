import "../Style/ListMenupage.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// const getMenu = require("../../../backend/controllers/ListMenucontroller.js");
// import {
//     getListMenu
// } from "../../../backend/controllers/ListMenucontroller.js";


const ListMenucomp = () => {
    //menus adalah nama state, dan setMenus adalah method untuk merubah state
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8888/ListMenu')
        .then(result => {
            console.log('data API ada', result.data);
            const responseAPI = result.data;

            setMenus(responseAPI.data);
        })
        .catch(err => {
            console.log('error: data tidak terambil - ', err);
        })
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id Menu</th>
                        <th>Nama Menu</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Deskripsi</th>
                        <th>Kategori</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu, index) => (
                        <tr key={menu._id}>
                            <td>{index + 1}</td>
                            <td>{menu.idMenu}</td>
                            <td>{menu.namaMenu}</td>
                            <td>{menu.hargaMenu}</td>
                            <td>{menu.stokMenu}</td>
                            <td>{menu.deskripsiMenu}</td>
                            <td>{menu.kategoriMenu}</td>
                            <td>
                                <Link to = {`edit/${menu._id}`}>
                                tes
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMenucomp;