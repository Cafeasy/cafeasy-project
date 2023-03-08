
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbarcomp(props) {
    return (
        <>
            <div className='keren'>
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
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        CAFEASY
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <NavDropdown title={`Welcome, ${props.user.name}`}> 
                                        <NavDropdown.Item href="">Logout</NavDropdown.Item>
                                        </NavDropdown>
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
                                type="search"
                                placeholder="Search"
                                className="me-2"
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