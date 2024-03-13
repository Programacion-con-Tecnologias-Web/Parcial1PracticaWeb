import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Home() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://my.api.mockaroo.com/login.json?key=16ada500");
          if (!response.ok) {
            throw new Error("Error al obtener los carros");
          }
          const data = await response.json();
          setCars(data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }, []);
  
    return (
      <Container className="home-container">
        <Row>
          <Col md={12}>
            <h2> Catálogo de Carros </h2>
            <Row>
              {cars.map((car) => (
                <Col md={3} key={car.carModel}>
                  <Card className="car-card">
                    <Card.Img variant="top" src={car.image} alt={car.carModel} />
                    <Card.Body>
                      <Card.Title>{car.carModel}</Card.Title>
                      <Link to={`/car/${car.carModel}`} className="car-link">
                        <Button variant="primary">
                          Ver Detalles
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
}

export default Home;
