import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup } from "react-bootstrap";
import { getUser } from "../../services/authService";

export default function UserDashboard() {
  const brandPurple = "#4a3f5a";
  // Obtenemos el usuario para saludarlo por su nombre (opcional)
  const user = getUser() || { full_name: "Usuario" };

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        {/* Contenedor principal blanco con bordes redondeados y sombra */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "20px", 
          padding: "2.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
        }}>
          
          {/* Cabecera del Dashboard */}
          <div className="mb-4">
            <h2 className="fw-bold">¡Hola de nuevo, {user.full_name.split(' ')[0]}! 👋</h2>
            <p className="text-muted fs-5">Aquí tienes un resumen de tu actividad y progreso en el club.</p>
          </div>

          {/* Fila Superior: 3 Tarjetas de Resumen */}
          <Row className="mb-5 g-4">
            
            {/* Tarjeta 1: Mis Reservas */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ backgroundColor: "#13c5dd", color: "white", borderRadius: "15px" }}>
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  <div>
                    <h4 className="fw-bold mb-3">Mis Reservas</h4>
                    <p>Tienes <strong>2 clases</strong> programadas para esta semana. ¡No faltes!</p>
                  </div>
                  <Button variant="light" className="w-100 fw-bold rounded-pill text-info mt-3">
                    Ver mi agenda
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta 2: Nuevas Clases */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ backgroundColor: "#1c1427", color: "white", borderRadius: "15px" }}>
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  <div>
                    <h4 className="fw-bold mb-3 text-warning">Nuevas Clases</h4>
                    <p>Descubre nuevas disciplinas y reserva tu cupo con un clic.</p>
                  </div>
                  <Button variant="outline-light" className="w-100 fw-bold rounded-pill mt-3">
                    Explorar horarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta 3: Meta Semanal */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ borderRadius: "15px", border: "1px solid #f0f0f0" }}>
                <Card.Body className="p-4 d-flex flex-column justify-content-center">
                  <h5 className="fw-bold mb-3">Meta Semanal</h5>
                  <p className="text-muted small mb-2">Has asistido a 3 de 4 entrenamientos.</p>
                  <ProgressBar variant="warning" now={75} style={{ height: "10px" }} className="mb-3 rounded-pill" />
                  <div className="text-center mt-auto">
                    <span className="fw-bold text-success">¡Estás a un paso de tu meta! 🏆</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Fila Inferior: Agenda y Membresía */}
          <Row className="g-4">
            
            {/* Columna Izquierda: Mi Agenda */}
            <Col md={7}>
              <h5 className="fw-bold mb-3">Mi Agenda para Hoy</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="fw-bold mb-1">CrossFit - Nivel Intermedio</h6>
                    <small className="text-muted">Coach: Marcos Silva | Sala Principal</small>
                  </div>
                  <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2 fs-6">
                    18:00 hrs
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="fw-bold mb-1">Piscina Libre</h6>
                    <small className="text-muted">Carril 3 reservado</small>
                  </div>
                  <Badge bg="info" className="rounded-pill px-3 py-2 fs-6">
                    20:00 hrs
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Columna Derecha: Mi Membresía */}
            <Col md={5}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Mi Membresía</h5>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Plan actual:</span>
                    <span className="fw-bold">Premium Anual</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted">Estado:</span>
                    <Badge bg="success" className="rounded-pill px-3 py-2">Activa</Badge>
                  </div>
                  
                  <Button variant="outline-dark" className="w-100 rounded-pill fw-bold mb-3">
                    Ver detalle de pagos
                  </Button>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted">
                      🔔 Recuerda que el día <strong>viernes</strong> el club cerrará a las 20:00 hrs por mantenimiento.
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </div>
      </Container>
    </div>
  );
}