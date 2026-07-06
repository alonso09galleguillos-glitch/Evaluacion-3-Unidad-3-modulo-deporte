import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function RoomFormModal({ show, handleClose, handleSave, selectedRoom }) {
const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    location: "",
    image_url: "",
    observation: "",
    status: true
});

useEffect(() => {
    if (selectedRoom) {
    setFormData({
        name: selectedRoom.name || "",
        description: selectedRoom.description || "",
        capacity: selectedRoom.capacity || "",
        location: selectedRoom.location || "",
        image_url: selectedRoom.image_url || "",
        observation: selectedRoom.observation || "",
        status: selectedRoom.status ?? true
    });
    } else {
    setFormData({ 
        name: "", description: "", capacity: "", location: "", image_url: "", observation: "", status: true 
    });
    }
}, [selectedRoom, show]);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value
    });
};

const onSubmit = (e) => {
    e.preventDefault();

    // 1. Validamos que los campos obligatorios no estén vacíos
    if (!formData.name || !formData.location || !formData.capacity) {
    alert("Por favor, completa el Nombre, la Ubicación y la Capacidad de la sala.");
    return;
    }

    // 2. Preparamos los datos convirtiendo la capacidad a número entero
    const dataToSend = {
    ...formData,
    capacity: parseInt(formData.capacity, 10) || 0
    };

    if (dataToSend.image_url === "") dataToSend.image_url = null; 
    if (dataToSend.description === "") dataToSend.description = null;
    if (dataToSend.observation === "") dataToSend.observation = null;

    handleSave(dataToSend);
};

return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
    <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-danger">
        {selectedRoom ? "Editar Sala" : "Nueva Sala"}
        </Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
        <Modal.Body>
        <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nombre de la Sala</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej. Sala de Pesas 1" required />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Ubicación</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ej. Piso 2 - Ala Norte" required />
            </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col md={9}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Descripción</Form.Label>
                <Form.Control as="textarea" rows={1} name="description" value={formData.description || ""} onChange={handleChange} placeholder="Ej. Equipada con máquinas de fuerza..." />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Capacidad</Form.Label>
                <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Ej. 20" required min="1" />
            </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3">
            <Form.Label className="fw-bold">URL de la Imagen</Form.Label>
            <Form.Control type="url" name="image_url" value={formData.image_url || ""} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Observaciones (Opcional)</Form.Label>
            <Form.Control as="textarea" rows={2} name="observation" value={formData.observation || ""} onChange={handleChange} placeholder="Detalles extra sobre mantenimiento, estado, etc." />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Check type="switch" id="room-status-switch" label={formData.status ? "Estado: Operativa" : "Estado: Fuera de Servicio"} name="status" checked={formData.status} onChange={handleChange} className={formData.status ? "text-success fw-bold" : "text-danger"} />
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="danger" type="submit">Guardar Sala</Button>
        </Modal.Footer>
    </Form>
    </Modal>
);
}