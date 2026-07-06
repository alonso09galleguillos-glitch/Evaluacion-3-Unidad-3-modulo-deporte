import { Container, Row, Col, Card, Badge, Table, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../../services/authService";

export default function AdminDashboard() {
  const brandPurple = "#4a3f5a";
  const user = getUser() || { full_name: "Admin" };

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "20px", 
          padding: "2.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
        }}>
          
          <div className="mb-4 pb-2 border-bottom">
            <h2 className="fw-bold text-danger mb-1">Panel de Control Global</h2>
            <p className="text-muted mb-0">Resumen operativo y administrativo del club. (Admin: {user.full_name.split(' ')[0]})</p>
          </div>

          <Row className="mb-5 g-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #0d6efd", borderRadius: "10px" }}>
                <Card.Body>
                  <div className="text-muted small fw-bold mb-1">Total Usuarios</div>
                  <h2 className="fw-bold mb-0">150</h2>
                  <small className="text-success fw-bold">↑ +12% este mes</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #dc3545", borderRadius: "10px" }}>
                <Card.Body>
                  <div className="text-muted small fw-bold mb-1">Ingresos Mensuales</div>
                  <h2 className="fw-bold mb-0">$1.2M</h2>
                  <small className="text-success fw-bold">↑ +5% vs mes anterior</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #198754", borderRadius: "10px" }}>
                <Card.Body>
                  <div className="text-muted small fw-bold mb-1">Coaches Activos</div>
                  <h2 className="fw-bold mb-0">12</h2>
                  <small className="text-muted fw-bold">Entrenadores en turno</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #ffc107", borderRadius: "10px" }}>
                <Card.Body>
                  <div className="text-muted small fw-bold mb-1">Clases Programadas</div>
                  <h2 className="fw-bold mb-0">24</h2>
                  <small className="text-danger fw-bold">↓ -2 canceladas hoy</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h5 className="fw-bold mb-3">Módulos Administrativos</h5>
          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">👥</div>
                  <div>
                    <h6 className="fw-bold mb-1">Gestión de Usuarios</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Roles, accesos y bloqueos.</p>
                    <Link to="/admin/usuarios" className="text-danger fw-bold text-decoration-none small">Administrar →</Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">📅</div>
                  <div>
                    <h6 className="fw-bold mb-1">Clases y Horarios</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Parrilla de actividades y cupos.</p>
                    <a href="#" className="text-danger fw-bold text-decoration-none small">Organizar agenda →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">💳</div>
                  <div>
                    <h6 className="fw-bold mb-1">Finanzas y Pagos</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Facturación y planes activos.</p>
                    <a href="#" className="text-danger fw-bold text-decoration-none small">Ver finanzas →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">🏅</div>
                  <div>
                    <h6 className="fw-bold mb-1">Staff de Entrenadores</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Desempeño y asignación.</p>
                    <a href="#" className="text-danger fw-bold text-decoration-none small">Gestionar equipo →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">🏢</div>
                  <div>
                    <h6 className="fw-bold mb-1">Instalaciones</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Mantenimiento de áreas/máquinas.</p>
                    <a href="#" className="text-danger fw-bold text-decoration-none small">Revisar estado →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                <Card.Body className="d-flex align-items-center p-3">
                  <div className="me-3 fs-2">📊</div>
                  <div>
                    <h6 className="fw-bold mb-1">Reportes y Auditoría</h6>
                    <p className="text-muted small mb-2" style={{ lineHeight: "1.2" }}>Exportar datos de uso y logs.</p>
                    <a href="#" className="text-danger fw-bold text-decoration-none small">Generar reportes →</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="g-4">
            
            <Col md={7}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Atención Requerida</h5>
                <Badge bg="danger" className="rounded-pill px-3 py-2 shadow-sm">3 Pendientes</Badge>
              </div>
              <Card className="border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                <Table hover responsive className="mb-0 align-middle">
                  <thead className="bg-light text-muted">
                    <tr>
                      <th className="border-0 py-3 ps-4">Solicitud</th>
                      <th className="border-0 py-3">Fecha</th>
                      <th className="border-0 py-3">Estado</th>
                      <th className="border-0 py-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold ps-4">Validar certificado médico</td>
                      <td className="text-muted small">Hoy, 10:30</td>
                      <td><Badge bg="warning" text="dark" className="rounded-pill">Pendiente</Badge></td>
                      <td className="text-center"><a href="#" className="text-primary text-decoration-none fw-bold small">Revisar</a></td>
                    </tr>
                    <tr>
                      <td className="fw-bold ps-4">Aprobar registro de Coach</td>
                      <td className="text-muted small">Ayer, 18:45</td>
                      <td><Badge bg="warning" text="dark" className="rounded-pill">Pendiente</Badge></td>
                      <td className="text-center"><a href="#" className="text-primary text-decoration-none fw-bold small">Revisar</a></td>
                    </tr>
                    <tr>
                      <td className="fw-bold ps-4">Solicitud de reembolso #4421</td>
                      <td className="text-muted small">Ayer, 12:00</td>
                      <td><Badge bg="danger" className="rounded-pill">Urgente</Badge></td>
                      <td className="text-center"><a href="#" className="text-primary text-decoration-none fw-bold small">Revisar</a></td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col md={5}>
              <h5 className="fw-bold mb-3">Registro del Sistema</h5>
              <Card className="border-0 shadow-sm" style={{ borderRadius: "12px" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="py-3 px-4 border-bottom">
                    <div className="d-flex">
                      <div className="me-3 fs-5">🟢</div>
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">Nuevo registro completado</h6>
                        <p className="text-muted small mb-1">Usuario 'Matías Lopez' se registró con éxito.</p>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>Hace 5 minutos</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 px-4 border-bottom">
                    <div className="d-flex">
                      <div className="me-3 fs-5">💳</div>
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">Pago procesado</h6>
                        <p className="text-muted small mb-1">Suscripción anual renovada (ID: #4992).</p>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>Hace 42 minutos</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 px-4">
                    <div className="d-flex">
                      <div className="me-3 fs-5">⚠️</div>
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">Alerta de capacidad</h6>
                        <p className="text-muted small mb-1">La clase 'HIIT' de las 19:00 llegó a su límite.</p>
                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>Hace 2 horas</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}