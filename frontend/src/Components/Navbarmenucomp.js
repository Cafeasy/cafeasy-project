import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbarmenucomp() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <navbar-text href="#home">Waffles</navbar-text>
                <navbar-text href="#home">Dessert</navbar-text>
                <navbar-text href="#home">Main Course</navbar-text>
                <navbar-text href="#home">Drink</navbar-text>
            </Container>
        </Navbar>
    );
}

export default Navbarmenucomp;