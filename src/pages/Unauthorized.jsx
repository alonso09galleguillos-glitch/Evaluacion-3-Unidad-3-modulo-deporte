import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const brandPurple = "#4a3f5a";

  return (
    <div style={{ 
      backgroundColor: brandPurple, 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      padding: "20px" 
    }}>
      <Container className="d-flex justify-content-center">
        <div style={{ 
          backgroundColor: "white", 
          border: "3px solid black", 
          borderRadius: "15px", 
          padding: "3rem 2rem",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}>
          
          <div style={{ fontSize: "4rem", marginBottom: "10px" }}>
            🔒
          </div>
          
          <h2 className="fw-bold text-danger mb-3">Acceso Restringido</h2>
          
          <p className="text-muted mb-4">
            No tienes los permisos necesarios para visualizar esta sección. Verifica tu rol o inicia sesión con la cuenta correspondiente.
          </p>
          
          <Button 
            variant="danger" 
            size="lg" 
            className="w-100 fw-bold"
            onClick={() => navigate("/login")}
          >
            Volver al Login
          </Button>

        </div>
      </Container>
    </div>
  );
}