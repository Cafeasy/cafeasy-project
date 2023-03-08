import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Gambarburger from '../Photo/Burger.jpeg'
import Gambarpizza from '../Photo/Pizza.jpeg'
import Gambarwaffels from '../Photo/Waffles.jpeg'
import "../Style/Maincourse.css";


function GridExample() {
  return (
    <Row xs={2} md={4} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col>
          <Card className='mx-1'>
            <Card.Img variant="top" src={Gambarburger} />
            <Card.Body>
              <Card.Title>Burger</Card.Title>  
              
              <h6 class="text-muted">
                This is a longer card with supporting text below 
              </h6>
              <div class="text text-end text-warning">********</div>
            </Card.Body>
          </Card>   
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;