import { Container, Table } from "react-bootstrap";

export default function AdminCalendarPage() {
  const brandPurple = "#4a3f5a";

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ 
          backgroundColor: "white", border: "3px solid black", borderRadius: "15px", 
          padding: "2rem", maxWidth: "1000px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" 
        }}>
          <h2 className="mb-4 fw-bold text-danger">Calendario General</h2>
          <Table striped bordered hover className="mt-3">
            <thead className="table-dark">
              <tr><th>Hora</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr>
            </thead>
            <tbody>
              <tr><td>08:00 AM</td><td>Yoga</td><td>Pesas</td><td>Spinning</td><td>CrossFit</td><td>Yoga</td></tr>
              <tr><td>10:00 AM</td><td>CrossFit</td><td>-</td><td>Zumba</td><td>Pesas</td><td>-</td></tr>
              <tr><td>18:00 PM</td><td>Spinning</td><td>Zumba</td><td>-</td><td>Yoga</td><td>CrossFit</td></tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}