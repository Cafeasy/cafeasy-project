import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../Style/Navbar.css"

function Navbarmenucomp() {
  return (
    <>
  
      <Navbar  bg="light" variant="light">
        <Container className='navmenu'>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="mx-auto ">
            <Nav.Link href="#Waffles">Waffles</Nav.Link>
            <Nav.Link href="#Desert">Desert</Nav.Link>
            <Nav.Link href="#Main Course">Main </Nav.Link>
            <Nav.Link href="#Drink">Drink</Nav.Link>
            <Nav.Link href="#Others">Others</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarmenucomp;