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
                    <Carousel.Caption>
                        <h3>Burger Besar Enak</h3>
                        <p>120k Only.</p>
                    </Carousel.Caption>
                
                </Carousel.Item>
               
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarpizza}
                        alt="Second slide"
                     

                    />

                    <Carousel.Caption>
                        <h3>Pizza Domino</h3>
                        <p>90K</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarwaffels}
                        alt="Third slide"
                       
                    />

                    <Carousel.Caption>
                        <h3>Waffles</h3>
                        <p>
                            40k
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

    )

}

export default Slidercomp