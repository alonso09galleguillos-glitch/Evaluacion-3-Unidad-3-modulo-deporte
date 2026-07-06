import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function SportFormModal({ show, handleClose, handleSave, selectedSport }) {
const [formData, setFormData] = useState({
    name: "",
    objective: "",
    duration: "",
    status: true
});

useEffect(() => {
    if (selectedSport) {
    setFormData({
        name: selectedSport.name,
        objective: selectedSport.objective,
        duration: selectedSport.duration,
        status: selectedSport.status
    });
    } else {
    setFormData({ name: "", objective: "", duration: "", status: true });
    }
}, [selectedSport, show]);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value
    });
};

const onSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
};

return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-danger">
        {selectedSport ? "Editar Deporte" : "Nuevo Deporte"}
        </Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
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
            type="switch"
            id="sport-status-switch"
            label={formData.status ? "Estado: Activo" : "Estado: Inactivo"}
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className={formData.status ? "text-success fw-bold" : "text-muted"}
            />
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="danger" type="submit">Guardar</Button>
        </Modal.Footer>
    </Form>
    </Modal>
);
}