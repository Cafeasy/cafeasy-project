import React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import Gambarpizza from '../Photo/Pizza.jpeg'
import Gambarwaffels from '../Photo/Waffles.jpeg'
import Carousel from 'react-bootstrap/Carousel'
import "../Style/Slidergambar.css"

const Slidercomp = () => {
    return (
            <Carousel>   
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarburger}
                        alt="First slide"                 
                    />
                    <Carousel.Caption >
                        <h3 className="caption">Burger Besar Enak</h3>
                        <p className="caption2">120k Only.</p>
                    </Carousel.Caption>
                
                </Carousel.Item>
               
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarpizza}
                        alt="Second slide"
                     

                    />

                    <Carousel.Caption>
                        <h3 className="caption">Pizza Domino</h3>
                        <p className="caption2">90K</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarwaffels}
                        alt="Third slide"
                       
                    />

                    <Carousel.Caption>
                        <h3 className="caption">Waffles Murah</h3>
                        <p className="caption2">
                            40k
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

    )

}

export default Slidercomp