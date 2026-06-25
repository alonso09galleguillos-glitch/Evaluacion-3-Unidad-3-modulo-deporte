import { Container, Table } from "react-bootstrap";

export default function UserCalendarPage() {
  const brandPurple = "#4a3f5a";

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ 
          backgroundColor: "white", border: "3px solid black", borderRadius: "15px", 
          padding: "2rem", maxWidth: "1000px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" 
        }}>
          <h2 className="mb-4 fw-bold text-primary">Mi Calendario de Clases</h2>
          <Table striped bordered hover className="mt-3">
            <thead className="table-primary">
              <tr>
                <th>Hora</th>
                <th>Lunes</th>
                <th>Miércoles</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:00 AM</td>
                <td>Yoga</td>
                <td>-</td>
                <td>CrossFit</td>
              </tr>
              <tr>
                <td>18:00 PM</td>
                <td>-</td>
                <td>Spinning</td>
                <td>-</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}