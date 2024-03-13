import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CarDetail() {
  const location = useLocation();
  const { state: { car, userRole } } = location;
  const [editable, setEditable] = useState(userRole);

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  return (
    <div className="car-details">
      <Container>
        <h2>Detalles</h2>
        <Row>
          <Col md={7}>
            <Card.Img variant="top" src={car.image} alt={car.carModel} />
          </Col>
          <Col md={5}>
            <Card className="text-Detail">
              <Card.Body>
                <Card.Title>{car.partName}</Card.Title>
                {editable ? (
                  <div>
                    {/* Campos de entrada editable */}
                    <Card.Text>
                      Fabricante:{" "}
                      <input
                        type="text"
                        value={car.carMaker}
                        onChange={(e) => car.carMaker = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      Modelo:{" "}
                      <input
                        type="text"
                        value={car.carModel}
                        onChange={(e) => car.carModel = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      Año:{" "}
                      <input
                        type="text"
                        value={car.carYear}
                        onChange={(e) => car.carYear = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      Disponible:{" "}
                      <input
                        type="checkbox"
                        checked={car.avalaible}
                        onChange={(e) => car.avalaible = e.target.checked}
                      />
                    </Card.Text>
                    <Card.Text>
                      Descripción:{" "}
                      <input
                        type="text"
                        value={car.description}
                        onChange={(e) => car.description = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      Precio:{" "}
                      <input
                        type="text"
                        value={car.price}
                        onChange={(e) => car.price = e.target.value}
                      />
                    </Card.Text>
                    <Button onClick={handleEditToggle}>
                      Guardar Cambios
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Detalles como texto puro */}
                    <Card.Text>
                      Fabricante: <p>{car.carMaker}</p>
                    </Card.Text>
                    <Card.Text>
                      Modelo: <p>{car.carModel}</p>
                    </Card.Text>
                    <Card.Text>
                      Año: <p>{car.carYear}</p>
                    </Card.Text>
                    <Card.Text>
                      Descripción: <p>{car.description}</p>
                    </Card.Text>
                    <Card.Text>
                      Precio: {car.price}
                    </Card.Text>
                  </div>
                )}
                <Link to="/Home" state={{ userRole: userRole }}>
                  Volver a la Lista
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CarDetail;
