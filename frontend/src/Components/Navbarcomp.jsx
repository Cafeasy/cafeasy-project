
import "../Style/Navbar.css"
import Logoputih from '../Photo/LogoOnly.png'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Gambarburger from '../Photo/Burger.jpeg'
import Gambarpizza from '../Photo/Pizza.jpeg'
import Gambarwaffels from '../Photo/Waffles.jpeg'
import "../Style/Maincourse.css";
import { BsPlusCircle } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/esm/Button';
import Carousel from 'react-bootstrap/Carousel'
import "../Style/Slidergambar.css"
import "../Style/Navbar.css"


function Navbarcomp(props) {

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

    const [active, setActive] = useState("firstcard");
    const [filter, setFilter] = useState('');
    const searchText = (event) => {
        setFilter(event.target.value);
    }
    let dataSearch = menus.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })

    const logout = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/logout`,
            "_self"
        );
    };
    return (
        <>
            <div className=''>
                {['sm',].map((expand) => (
                    <Navbar key={expand} expand={expand} className="mb-4">
                        <Container fluid>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}


                            >

                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasDarkLabel-expand-${expand}`}>
                                        <div className="brand-color" ></div>
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body >


                                    <Nav className="justify-content-end flex-grow-1 pe-3" >


                                        <NavDropdown title={`Welcome, ${user?.name}`} id="basic-nav-dropdown">

                                            <NavDropdown.Item>       <button class="btn btn-light btn-rounded" type="button" onClick={logout}>Logout</button></NavDropdown.Item>
                                        </NavDropdown>

                                        <img className="logonav" alt="logo putih" src={Logoputih}></img>
                                        <h1 className="logotext">CAFEASY</h1>
                                        <Nav.Link href="#action1">Home</Nav.Link>
                                        <Nav.Link href="#action2">Profile</Nav.Link>
                                        <Nav.Link href="#action3">Kontak</Nav.Link>
                                        <Nav.Link href="#action4">Bantuan</Nav.Link>
                                    </Nav>

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                        <Form className="d-flex mx-auto">
                            <Form.Control
                                type="input"
                                placeholder="Search....."
                                className="searchbar"
                                aria-label="Search"
                                value={filter}
                                onChange={searchText.bind(this)}
                            />
                        </Form>

                    </Navbar>


                ))}
            </div>
            <div className="bestmenu"> <Carousel>
                <Carousel.Item>
                    <img
                        className="Gambarslider"
                        src={Gambarburger}
                        alt="First slide"
                    />
                    <Carousel.Caption >
                        <h3 className="caption">Burger Besar</h3>
                        <p className="caption2">120k.</p>
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
            </div>

            <div>
                <div class="navbar-container">
                    <ul>
                        <li fill class="nav-link active-link">
                            <a href="#" onClick={() => setActive("firstcard")}>Waffels
                            </a>
                            <div class="underline"></div>
                        </li>
                        <li class="nav-link">
                            <a href="#" onClick={() => setActive("secondcard")}>Desert</a>
                            <div class="underline"></div>
                        </li>
                        <li class="nav-link">
                            <a href="#" onClick={() => setActive("thirdcard")}>Main Course</a>
                            <div class="underline"></div>
                        </li>
                        <li class="nav-link">
                            <a href="#" onClick={() => setActive("fourthcard")}>Drink</a>
                            <div class="underline"></div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="listmenu">

                {active === "firstcard" && <Row xs={2} md={4} className="g-0">
                    {dataSearch.map((menu, index) => (
                        <Col>
                            <Card className='mx-1  mb-5 border-0 ' key={menu._id}>
                                <Card.Img variant="top" src={Gambarburger} />
                                <Card.Body>
                                    <Card.Title className='menu-harga'>52K</Card.Title>
                                    <Card.Title className='menu-tittle'>{menu.namaMenu}</Card.Title>
                                    <div className='rate'>
                                        <div class="text text-end text-warning">
                                            <BsStarFill size='10px' ></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                        </div>

                                        <div class="text text-end text-dark">
                                            <Button className='buttonplus' variant="text" >
                                                <BsPlusCircle></BsPlusCircle></Button></div>
                                    </div>
                                    <Card.Text className='menu-deskripsi'>
                                        {menu.deskripsiMenu}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>}
                {active === "secondcard" && <Row xs={2} md={4} className="g-0">
                    {dataSearch.map((menu, index) => (
                        <Col>
                            <Card className='mx-1 mb-5 border-0 ' key={menu._id}>
                                <Card.Img variant="top" src={Gambarburger} />
                                <Card.Body>

                                    <Card.Title className='menu-harga'>62K</Card.Title>
                                    <Card.Title className='menu-tittle'>{menu.namaMenu}</Card.Title>
                                    <div className='rate'>
                                        <div class="text text-end text-warning">
                                            <BsStarFill size='10px' ></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>
                                            <BsStarFill size='10px'></BsStarFill>

                                        </div>


                                        <div class="text text-end text-dark">
                                            <Button className='buttonplus' variant="text" >
                                                <BsPlusCircle></BsPlusCircle>
                                            </Button>
                                        </div>
                                    </div>
                                    <Card.Text className='menu-deskripsi'>
                                        {menu.deskripsiMenu}
                                    </Card.Text>


                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>}
            </div>
            <div>
                <ul class="fw-bold">Total.</ul>
                <button className="button-konfir" >Konfirmasi Pemesanan</button>
            </div>
        </>

    );
}

export default Navbarcomp;