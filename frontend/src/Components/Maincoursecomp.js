import React from "react"
import Navbarpage from "../Pages/Navbarpage"
import Slidercomp from "./Slidercomp"
import { Link } from 'react-router-dom'
import "../Style/Slidergambar.css"
import "../Style/Maincourse.css"
import { Card, Container, Row, Col, Image } from "react-bootstrap"
import Gambarburger from '../Photo/Burger.jpeg'
import Gambarpizza from '../Photo/Pizza.jpeg'
import Gambarwaffels from '../Photo/Waffles.jpeg'

const Maincoursecomp = () => {
    return (
        <div className="menu-utama">

            <div>
                <Container>

                    <Row>
                        <Col xs={6} className="movieWrapper" id="trending">
                            <Card className="movieImage">
                                <Image src={Gambarburger} alt="Dune Movies" className="images" />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-left">Burger</Card.Title>

                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>

                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} className="movieWrapper">
                            <Card className="movieImage">
                                <Image
                                    src={Gambarpizza}
                                    alt="Dune Movies"
                                    className="images"
                                />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-center">
                                            EVERYTHING EVERWHERE
                                        </Card.Title>
                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>
                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} className="movieWrapper">
                            <Card className="movieImage">
                                <Image src={Gambarwaffels} alt="Dune Movies" className="images" />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-center">INFINITE</Card.Title>
                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>
                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} className="movieWrapper">
                            <Card className="movieImage">
                                <Image src={Gambarpizza} alt="Dune Movies" className="images" />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-center">JOKER</Card.Title>
                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>
                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} className="movieWrapper">
                            <Card className="movieImage">
                                <Image
                                    src={Gambarwaffels}
                                    alt="Dune Movies"
                                    className="images"
                                />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-center">LIGHT YEAR</Card.Title>
                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>
                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} className="movieWrapper">
                            <Card className="movieImage">
                                <Image src={Gambarburger} alt="Dune Movies" className="images" />
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                        <Card.Title className="text-center">MORBIUS</Card.Title>
                                        <Card.Text className="text-left">
                                            This is a wider card with natural lead-in to additional
                                            content
                                        </Card.Text>
                                        <Card.Text className="text-left">
                                            Last updated 3 mins ago
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    )

}

export default Maincoursecomp