import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup } from "react-bootstrap";
import { getUser } from "../../services/authService";

export default function CoachDashboard() {
  const brandPurple = "#4a3f5a";
  // Obtenemos el coach para saludarlo por su nombre
  const user = getUser() || { full_name: "Coach" };

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
            <h2 className="fw-bold">¡Hola de nuevo, {user.full_name.split(' ')[0]}! 📋</h2>
            <p className="text-muted fs-5">Aquí tienes el resumen de tus clases, alumnos y métricas semanales.</p>
          </div>

          {/* Fila Superior: 3 Tarjetas de Resumen */}
          <Row className="mb-5 g-4">
            
            {/* Tarjeta 1: Mis Clases (Color Verde Coach) */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ backgroundColor: "#198754", color: "white", borderRadius: "15px" }}>
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  <div>
                    <h4 className="fw-bold mb-3">Clases de Hoy</h4>
                    <p>Tienes <strong>2 sesiones</strong> programadas para hoy. ¡A darlo todo!</p>
                  </div>
                  <Button variant="light" className="w-100 fw-bold rounded-pill text-success mt-3">
                    Ver mi agenda
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta 2: Alumnos Asignados (Oscura) */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ backgroundColor: "#1c1427", color: "white", borderRadius: "15px" }}>
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  <div>
                    <h4 className="fw-bold mb-3 text-success">Mis Alumnos</h4>
                    <p>Tienes <strong>15 alumnos</strong> activos bajo tu supervisión esta semana.</p>
                  </div>
                  <Button variant="outline-light" className="w-100 fw-bold rounded-pill mt-3">
                    Gestionar alumnos
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Tarjeta 3: Rendimiento Semanal */}
            <Col md={4}>
              <Card className="border-0 h-100 shadow-sm" style={{ borderRadius: "15px", border: "1px solid #f0f0f0" }}>
                <Card.Body className="p-4 d-flex flex-column justify-content-center">
                  <h5 className="fw-bold mb-3">Asistencia Promedio</h5>
                  <p className="text-muted small mb-2">El 85% de tus alumnos ha asistido a clases.</p>
                  <ProgressBar variant="success" now={85} style={{ height: "10px" }} className="mb-3 rounded-pill" />
                  <div className="text-center mt-auto">
                    <span className="fw-bold text-success">¡Excelente nivel de retención! 📈</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Fila Inferior: Agenda y Feedback */}
          <Row className="g-4">
            
            {/* Columna Izquierda: Agenda del Coach */}
            <Col md={7}>
              <h5 className="fw-bold mb-3">Mi Agenda de Clases</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-bottom px-0">
                  <div>
                    <h6 className="fw-bold mb-1">Entrenamiento Funcional</h6>
                    <small className="text-muted">Capacidad: 10/12 Alumnos | Zona de Pesos</small>
                  </div>
                  <Badge bg="success" className="rounded-pill px-3 py-2 fs-6 shadow-sm">
                    10:00 hrs
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-bottom px-0">
                  <div>
                    <h6 className="fw-bold mb-1">CrossFit - Nivel Avanzado</h6>
                    <small className="text-muted">Capacidad: 15/15 Alumnos | Sala Principal</small>
                  </div>
                  <Badge bg="success" className="rounded-pill px-3 py-2 fs-6 shadow-sm">
                    18:30 hrs
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Columna Derecha: Feedback Reciente (Reemplaza a la Membresía) */}
            <Col md={5}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Feedback Reciente</h5>
                  
                  <div className="mb-3 border-bottom pb-2">
                    <p className="mb-1 fst-italic small">"Excelente rutina, me ha servido mucho."</p>
                    <div className="text-end text-success fw-bold small">- Juan Pérez</div>
                  </div>
                  
                  <div className="mb-4 border-bottom pb-2">
                    <p className="mb-1 fst-italic small">"¿Podemos cambiar el horario de mañana?"</p>
                    <div className="text-end text-success fw-bold small">- Ana Gómez</div>
                  </div>
                  
                  <Button variant="outline-success" className="w-100 rounded-pill fw-bold mt-2">
                    Ver todos los mensajes
                  </Button>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </div>
      </Container>
    </div>
  );
}