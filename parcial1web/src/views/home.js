import React, { useState, useEffect } from "react";
import data from "./data.json";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl"; // Importar FormattedMessage para la internacionalización

function Home() {
    const [cars, setCars] = useState(data);
    const [selectedcar, setSelectedcar] = useState(null);
    const [error, setError] = useState("");
    const location = useLocation(); // Obtener la ubicación
    const userRole = location.state ? location.state.userRole : null; // Verificar y obtener userRole
  
    const handlecarClick = (carModel) => {
      const car = cars.find((car) => car.carModel === carModel);
      setSelectedcar(car);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("data.json");
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
            <h2>
              <FormattedMessage id="home.catalogHeader" /> {/* Internacionalizar el encabezado */}
            </h2>
            <Row>
              {cars.map((car) => (
                <Col md={3} key={car.carModel}>
                  <Card
                    className={`car-card ${
                      selectedcar && selectedcar.carModel === car.carModel ? "selected" : ""
                    }`}
                  >
                    <Card.Img variant="top" src={car.image} alt={car.carModel} />
                    <Card.Body>
                      <Card.Title>{car.partName}</Card.Title>
                      <Link
                        to={`/car/${car.carModel}`}
                        state={{ car, userRole }}
                        className="car-link"
                      >
                        <Button
                          variant="primary"
                          onClick={() => handlecarClick(car.carModel)}
                        >
                          <FormattedMessage id="home.viewDetailsButton" /> 
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