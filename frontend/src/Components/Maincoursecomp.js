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
import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/esm/Button';
import { Link } from "react-router-dom";


function GridExample () {
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



  return (
    <Row xs={2} md={4} className="g-4">
      {menus.map((menu, index) => (
        <Col>
          <Card className='mx-1' key={menu._id}>
            <Card.Img variant="top" src={Gambarburger} />
            <Card.Body>
              <Card.Title>{menu.namaMenu}</Card.Title>  
              
              <h6 class="text-muted">
                {menu.deskripsiMenu} 
              </h6>
              <div class="text text-end text-warning">
                <BsStarFill></BsStarFill>
                <BsStarFill></BsStarFill>
                <BsStarFill></BsStarFill>
                <BsStarFill></BsStarFill>
     

              </div>
              
              <div  class="text text-end text-dark">
              <Button variant="text" >
                <BsPlusCircle></BsPlusCircle></Button></div>
             

            </Card.Body>
          </Card>   
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;