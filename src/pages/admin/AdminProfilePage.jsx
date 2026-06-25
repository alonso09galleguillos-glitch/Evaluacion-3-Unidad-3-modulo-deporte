import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { getUser } from "../../services/authService";
import { updateUser } from "../../services/userService";

export default function AdminProfilePage() {
  const brandPurple = "#4a3f5a";
  
  // 1. Obtenemos el usuario logueado actualmente
  const currentUser = getUser() || {};

  // 2. Estado para manejar el formulario (cargamos sus datos actuales)
  const [formData, setFormData] = useState({
    full_name: currentUser.full_name || "",
    email: currentUser.email || "",
    password: "", // La dejamos en blanco por seguridad
  });

  // 3. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 4. Función para enviar la petición PUT al backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Preparamos los datos a enviar
      const dataToSend = {
        full_name: formData.full_name,
        email: formData.email,
      };
      
      // Solo enviamos la contraseña si el usuario escribió una nueva
      if (formData.password.trim() !== "") {
        dataToSend.password = formData.password;
      }

      // Llamamos a tu servicio PUT (/api/users/:id)
      await updateUser(currentUser.id, dataToSend);

      // --- AQUÍ ESTÁ LA MAGIA PARA ACTUALIZAR EL FRONTEND ---
      // Obtenemos los datos actuales guardados en la memoria del navegador
      const storedUserString = localStorage.getItem("user");
      
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString);
        // Modificamos solo el nombre y correo con lo que el usuario escribió
        storedUser.full_name = formData.full_name;
        storedUser.email = formData.email;
        // Volvemos a guardar la información actualizada en el navegador
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
      // -------------------------------------------------------

      Swal.fire("Éxito", "Perfil actualizado correctamente", "success").then(() => {
        // Recargamos la página para que el Navbar lea el nuevo nombre del localStorage
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
          <h2 className="mb-4 fw-bold text-danger">Mi Perfil (Admin)</h2>
          
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
              <Button variant="danger" type="submit">Guardar Cambios</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}