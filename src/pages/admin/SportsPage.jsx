import { useEffect, useState } from "react";
import { Container, Card, Button, Table, Badge, Form, Modal, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { getSports, createSport, updateSport, deleteSport, changeSportStatus } from "../../services/sportService";
import SportFormModal from "../../components/sports/SportFormModal.jsx";

export default function SportsPage() {
const [sports, setSports] = useState([]);
const [loading, setLoading] = useState(true);


const [showModal, setShowModal] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [currentId, setCurrentId] = useState(null);
const [formData, setFormData] = useState({
    name: "",
    objective: "",
    duration: "",
    status: true
});

const brandPurple = "#4a3f5a";

const formatCustomDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} de ${month} de ${year}`;
};

const loadSports = async () => {
    try {
    setLoading(true);
    const result = await getSports();
    setSports(result.data);
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    } finally {
    setLoading(false);
    }
};

  useEffect(() => {
    loadSports();
  }, []);

  const handleShowModal = (sport = null) => {
    if (sport) {
      setIsEditing(true);
      setCurrentId(sport.id);
      setFormData({
        name: sport.name,
        objective: sport.objective,
        duration: sport.duration,
        status: sport.status
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setFormData({ name: "", objective: "", duration: "", status: true });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.objective || !formData.duration) {
      return Swal.fire("Atención", "Todos los campos de texto son obligatorios.", "warning");
    }

    try {
      if (isEditing) {
        await updateSport(currentId, { ...formData, duration: Number(formData.duration) });
        Swal.fire("Actualizado", "Deporte actualizado correctamente", "success");
      } else {
        await createSport({ ...formData, duration: Number(formData.duration) });
        Swal.fire("Creado", "Deporte creado correctamente", "success");
      }
      handleCloseModal();
      loadSports(); // Actualización automática
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDelete = async (sport) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este deporte?",
      text: `Se eliminará: ${sport.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await deleteSport(sport.id);
        Swal.fire("Eliminado", "Deporte eliminado correctamente", "success");
        loadSports(); 
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleStatusChange = async (sport) => {
    const newStatus = !sport.status;
    try {
      await changeSportStatus(sport.id, newStatus);
      loadSports();
    } catch (error) {
      Swal.fire("Error", "No se pudo cambiar el estado", "error");
    }
  };

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "1.5rem", maxWidth: "1200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}>
          
          <Card className="border-0">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0 pb-3">
              <h4 className="mb-0 fw-bold text-danger">Gestión de Deportes</h4>
              <div>
                {/* Botón Refrescar exigido en rúbrica */}
                <Button variant="outline-secondary" className="me-2" onClick={loadSports}>
                  🔄 Refrescar
                </Button>
                <Button variant="danger" onClick={() => handleShowModal()}>
                  + Nuevo Deporte
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" variant="danger" />
                  <p className="mt-2">Cargando deportes...</p>
                </div>
              ) : (
                <Table responsive hover className="mt-3 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Objetivo</th>
                      <th>Duración</th>
                      <th>Creación</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sports.map((sport) => (
                      <tr key={sport.id}>
                        <td className="fw-bold">{sport.name}</td>
                        <td style={{ maxWidth: "250px" }} className="text-truncate">{sport.objective}</td>
                        <td>{sport.duration} min</td>
                        <td>{formatCustomDate(sport.created_at)}</td>
                        <td>
                          <Form.Check 
                            type="switch"
                            id={`switch-${sport.id}`}
                            checked={sport.status}
                            onChange={() => handleStatusChange(sport)}
                            label={sport.status ? "Activo [ON]" : "Inactivo [OFF]"}
                            className={sport.status ? "text-success fw-bold" : "text-muted"}
                          />
                        </td>
                        <td>
                          <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(sport)}>
                            Editar
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(sport)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {sports.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">No hay deportes registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">
            {isEditing ? "Editar Deporte" : "Nuevo Deporte"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nombre del Deporte</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Ej. Natación"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Objetivo</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="objective" 
                value={formData.objective} 
                onChange={handleChange} 
                placeholder="Ej. Mejorar resistencia física"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Duración (minutos)</Form.Label>
              <Form.Control 
                type="number" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                placeholder="Ej. 60"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="¿Deporte Activo?" 
                name="status" 
                checked={formData.status} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="danger" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </div>
  );
}