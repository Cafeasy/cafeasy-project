import * as React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import { useEffect, useState } from "react"
import axios from "axios";

export default function App() {
    const user = props.user;
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
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="App">
      <section className="hero">
        <img
          src={Gambarburger}
          alt="test"
          className="parallax"
        />
        <div className="text-wrapper">
          <h1 className="headline">{menu.namaMenu}</h1>
          <h2 className="sub-headline">Scrolling effect</h2>
        </div>
      </section>
    </div>
  )
}