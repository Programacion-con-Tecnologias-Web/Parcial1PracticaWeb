import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useEffect from 'react';



// Realiza el Home donde se vea las cartas de los carros con su titulo, imagen, price y que al oprimirla se vaya a la vista de detalle de carro

function Home() {

    // que la información salga de un json https://github.com/Programacion-con-Tecnologias-Web/Parcial1PracticaWeb/blob/main/parcial1practica/src/views/Datos.json

    const [cars, setCars] = React.useState([]);
    const [selectedCar, setSelectedCar] = React.useState("");
    const [error, setError] = React.useState("");
    const [userRole, setUserRole] = React.useState(false);

    const handleCarClick = (carModel) => { // Función para manejar el click en un carro
        const car = cars.find((car) => car.carModel === carModel);
        setSelectedCar(car);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://github.com/Programacion-con-Tecnologias-Web/Parcial1PracticaWeb/blob/main/parcial1practica/src/views/Datos.json");
                if (!response.ok) {
                    throw new Error("Error al obtener los carros");
                }
                const data = await response.json();
                setCars(data);
            } catch (error) {
                setError(error.message);
            }
        }
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
                                <Card
                                    className={`car-card ${
                                        selectedCar && selectedCar.carModel === car.carModel ? "selected" : ""
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
                                                onClick={() => handleCarClick(car.carModel)}
                                            >
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