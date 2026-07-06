import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getSportRooms } from "../../services/sportRoomService";

export default function ReservationFormModal({ show, handleClose, handleSave }) {
  const [sportRooms, setSportRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    sport_room_id: "",
    reservation_date: "",
    reservation_time: ""
  });

  useEffect(() => {
    if (show) {
      const fetchClasses = async () => {
        try {
          setLoading(true);
          const res = await getSportRooms();
          const allRooms = Array.isArray(res) ? res : (res.data || []);
          const activeRooms = allRooms.filter(room => room.status === true);
          setSportRooms(activeRooms);
        } catch (error) {
          console.error("Error al cargar las clases:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchClasses();
      setFormData({ sport_room_id: "", reservation_date: "", reservation_time: "" });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.sport_room_id || !formData.reservation_date || !formData.reservation_time) {
      alert("Por favor, selecciona una clase, fecha y hora.");
      return;
    }

    const dataToSend = {
      sport_room_id: parseInt(formData.sport_room_id, 10),
      date: formData.reservation_date,
      time: formData.reservation_time,
      status: true
    };

    handleSave(dataToSend);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title className="fw-bold">Crear Nueva Reserva</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {loading ? (
            <div className="text-center py-4"><Spinner animation="border" variant="success" /></div>
          ) : (
            <Row>
              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">1. Selecciona la Clase (Deporte - Sala - Coach)</Form.Label>
                  <Form.Select name="sport_room_id" value={formData.sport_room_id} onChange={handleChange} required>
                    <option value="">-- Elige una clase disponible --</option>
                    {sportRooms.map((sr) => {
                      const sportName = sr.sport?.name || `Deporte #${sr.sport_id}`;
                      const roomName = sr.room?.name || `Sala #${sr.room_id}`;
                      const coachName = sr.coach?.full_name || `Coach #${sr.coach_id}`;
                      const capacity = sr.room?.capacity ? `(Capacidad: ${sr.room.capacity} pers.)` : "";

                      return (
                        <option key={sr.id} value={sr.id}>
                          {sportName} | {roomName} {capacity} | Coach: {coachName}
                        </option>
                      );
                    })}
                  </Form.Select>
                  {sportRooms.length === 0 && (
                    <Form.Text className="text-danger">No hay clases activas disponibles en este momento.</Form.Text>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">2. Fecha de la reserva</Form.Label>
                  <Form.Control type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">3. Hora</Form.Label>
                  <Form.Control type="time" name="reservation_time" value={formData.reservation_time} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="success" type="submit" disabled={loading || sportRooms.length === 0}>
            Confirmar Reserva
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}