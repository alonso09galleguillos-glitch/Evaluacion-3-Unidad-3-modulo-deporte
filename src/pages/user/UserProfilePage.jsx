import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { getUser } from "../../services/authService";
import { updateUser } from "../../services/userService";

export default function UserProfilePage() {
  const brandPurple = "#4a3f5a";

  const currentUser = getUser() || {};

  const [formData, setFormData] = useState({
    full_name: currentUser.full_name || "",
    email: currentUser.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Preparamos los datos a enviar
      const dataToSend = {
        full_name: formData.full_name,
        email: formData.email,
      };
      
      if (formData.password.trim() !== "") {
        dataToSend.password = formData.password;
      }


      await updateUser(currentUser.id, dataToSend);

      const storedUserString = localStorage.getItem("user");
      
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString);
        storedUser.full_name = formData.full_name;
        storedUser.email = formData.email;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
      // -------------------------------------------------------

      Swal.fire("Éxito", "Perfil actualizado correctamente", "success").then(() => {
        window.location.reload(); 
      });

    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message || "Error al actualizar", "error");
    }
  };

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ 
          backgroundColor: "white", border: "3px solid black", borderRadius: "15px", 
          padding: "2rem", maxWidth: "800px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" 
        }}>
          <h2 className="mb-4 fw-bold text-primary">Mi Perfil</h2>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre Completo</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nueva Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Escribe para cambiar..." 
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Foto de Perfil</Form.Label>
                  <Form.Control type="file" />
                  <Form.Text className="text-muted">La subida de foto es simulada en esta versión.</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}