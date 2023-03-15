
import "../Style/Navbar.css"

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {HiOutlineSearch} from "react-icons/hi";

function Navbarcomp(props) {
    const user = props.user;

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
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title   id= {`offcanvasDarkLabel-expand-${expand}`}>
                                    <div className="brand-color" ></div>
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body >
                                    <div className="brand-color2">
                                    <Nav className="justify-content-end flex-grow-1 pe-3" >

                                        <NavDropdown title={`Welcome, ${user?.name}`} id="basic-nav-dropdown">
                                            <NavDropdown.Item>       <button class="btn btn-light btn-rounded" type="button" onClick={logout}>Logout</button></NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link href="#action1">Home</Nav.Link>
                                        <Nav.Link href="#action2">Profile</Nav.Link>
                                        <Nav.Link href="#action3">Kontak</Nav.Link>
                                        <Nav.Link href="#action4">Bantuan</Nav.Link>
                                    </Nav>
                                    </div>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>

                        </Container>




                        <Form className="d-flex mx-auto">

                            <Form.Control
                                type="search"
                                placeholder="Search....."
                                className="searchbar"
                                aria-label="Search"
                            />
                        </Form>
                  
                    </Navbar>

                ))}
            </div>
        </>

    );
}

export default Navbarcomp;