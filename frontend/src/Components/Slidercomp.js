import React from "react"
import Gambarburger from '../Photo/Burger.jpeg'
import Gambarpizza from '../Photo/Pizza.jpeg'
import Gambarwaffels from '../Photo/Waffles.jpeg'
import Carousel from 'react-bootstrap/Carousel'
import "../Style/Slidergambar.css"

const Slidercomp = () => {
    return (
        <div className="adjie">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Gambarburger}
                        alt="First slide"
                        height="250"

                    />
                    <Carousel.Caption>
                        <h3>Burger Besar Enak</h3>
                        <p>120k Only.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Gambarpizza}
                        alt="Second slide"
                        height="250"

                    />

                    <Carousel.Caption>
                        <h3>Pizza Domino</h3>
                        <p>90K</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Gambarwaffels}
                        alt="Third slide"
                        height="250"
                    />

                    <Carousel.Caption>
                        <h3>Waffles</h3>
                        <p>
                            40k
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )

}

export default Slidercomp