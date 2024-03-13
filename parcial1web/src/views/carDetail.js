import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl"; 
import "./carDetail.css";

function CarDetail() {
  const location = useLocation();
  const { state: { car, userRole } } = location;
  const [editable, setEditable] = useState(userRole);
  const intl = useIntl();

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  return (
    <div className="car-details">
      <Container>
        <h2>
          <FormattedMessage id="carDetail.detailHeader" />
        </h2>
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
                      <FormattedMessage id="carDetail.madeBy" />
                      <input
                        type="text"
                        value={car.carMaker}
                        onChange={(e) => car.carMaker = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.model" />
                      <input
                        type="text"
                        value={car.carModel}
                        onChange={(e) => car.carModel = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.year" />
                      <input
                        type="text"
                        value={car.carYear}
                        onChange={(e) => car.carYear = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.available" />
                      <input
                        type="checkbox"
                        checked={car.avalaible}
                        onChange={(e) => car.avalaible = e.target.checked}
                      />
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.description" />
                      <input
                        type="text"
                        value={car.description}
                        onChange={(e) => car.description = e.target.value}
                      />
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.price" />
                      <input
                        type="text"
                        value={car.price}
                        onChange={(e) => car.price = e.target.value}
                      />
                    </Card.Text>
                    <Button onClick={handleEditToggle}>
                      <FormattedMessage id="carDetail.saveChanges" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Detalles como texto puro */}
                    <Card.Text>
                      <FormattedMessage id="carDetail.madeBy" />: <p>{car.carMaker}</p>
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.model" />: <p>{car.carModel}</p>
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.year" />: <p>{car.carYear}</p>
                    </Card.Text>
                    <Card.Text>
                      <FormattedMessage id="carDetail.description" />: <p>{car.description}</p>
                    </Card.Text>
                    <Card.Text>
                    <FormattedMessage id="carDetail.price" />:{" "}
                    {intl.formatNumber(
                      parseFloat(car.price.replace("$", "")) *
                        (intl.locale === "es-ES" || intl.locale === "es" ? 3800 : 1), // 3800 es el factor de conversión
                      {
                        style: "currency",
                        currency: intl.locale === "es" ? "COP" : "USD",
                      }
                    )}
                  </Card.Text>
                  </div>
                )}
                <Link to="/Home" state={{ userRole: userRole }}>
                  <FormattedMessage id="carDetail.backToList" />
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