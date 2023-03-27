import "../Style/Detailmenupage.css";
import * as React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import { useEffect, useState } from "react"

export default function App() {
  const [, setOffset] = useState(0)

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
        <div class='content'>
          <h1 class="pagetitle">American Waffle</h1>
          <h4 class="headline">Deskripsi</h4>
          <p class="sub-headline">Wafel Amerika renyah di luar dan ringan serta lembut di dalam. Mereka biasanya dibesarkan dengan baking powder atau bahan pengembang kimia, tidak seperti wafel Belgia (kadang-kadang disebut gauffres) yang secara tradisional menggunakan ragi untuk ragi.

            Menurut pengalaman saya, wafel Amerika juga biasanya berbentuk bulat, sedangkan wafel Belgia biasanya berbentuk persegi panjang.

            Wafel Amerika sering kali lebih manis daripada beberapa jenis wafel lainnya. Mereka juga dapat menambahkan rasa tambahan pada adonannya, seperti blueberry atau keping cokelat mini.</p>
        </div>
        <div>
          <button className="button-konfir" >Konfirmasi Pemesanan</button>
        </div>
      </section>
    </div>
  )
}