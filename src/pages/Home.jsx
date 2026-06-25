import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button, Row, Col, Card, Badge } from "react-bootstrap"
import logo from "../assets/logo.png" // <-- AQUÍ IMPORTAMOS EL LOGO

export default function Home() {
const brandPurple = "#4a3f5a";

return (
    <div style={{ overflowX: "hidden" }}>
      {/* Navbar con el Logo real */}
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
        <Navbar.Brand>
            <img
            src={logo}
            alt="Logo SportClub"
              height="40" // <-- Ajusta este número si el logo se ve muy grande o muy chico
            className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
            <Link to="/login" className="text-decoration-none me-3">
                <Button variant="warning" className="fw-bold">Iniciar Sesión</Button>
            </Link>
            <Link to="/register" className="text-decoration-none">
                <Button variant="warning" className="fw-bold">Registrarse</Button>
            </Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

      {/* Contenido Principal dividido en dos columnas */}
    <Row className="m-0" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Mitad Izquierda (Morado oscuro) */}
        <Col md={6} className="d-flex flex-column justify-content-center p-5" style={{ backgroundColor: brandPurple, color: "white" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Badge bg="warning" text="dark" className="mb-4 px-3 py-2 fs-6 rounded-pill">
            Únete a la Comunidad
            </Badge>
            <h1 className="display-3 fw-bold mb-4">Nuestro Propósito</h1>
            <p className="lead" style={{ opacity: 0.9 }}>
            Acompañar a cada persona en su proceso, sin importar su nivel o experiencia. En SportClub no solo vienes a entrenar... vienes a crecer, a superarte y a construir tu mejor versión.
            </p>
        </div>
        </Col>

        {/* Mitad Derecha (Blanca con Tarjetas) */}
        <Col md={6} className="d-flex flex-column justify-content-center p-5 bg-white">
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            
            <Card className="mb-4 shadow-sm" style={{ borderRadius: "10px", border: "1px solid #dee2e6" }}>
            <Card.Body className="p-4">
                <Card.Title className="fw-bold mb-3" style={{ color: brandPurple }}>
                Beneficios del Entrenamiento
                </Card.Title>
                <Card.Text className="text-muted">
                Contamos con entrenadores especializados y programas personalizados diseñados para tus objetivos.
                </Card.Text>
            </Card.Body>
            </Card>

            <Card className="shadow-sm" style={{ borderRadius: "10px", border: "1px solid #dee2e6" }}>
            <Card.Body className="p-4">
                <Card.Title className="fw-bold mb-3" style={{ color: brandPurple }}>
                Nuestra Visión
                </Card.Title>
                <Card.Text className="text-muted">
                Ser el club deportivo referente en la formación integral de personas y tecnología aplicada al deporte.
                </Card.Text>
            </Card.Body>
            </Card>

        </div>
        </Col>
    </Row>
    </div>
)
}