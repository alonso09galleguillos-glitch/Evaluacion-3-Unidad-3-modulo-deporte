import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getRooms } from "../../services/roomService";
import { getSports } from "../../services/sportService"; 
import { getUsers } from "../../services/userService"; 

export default function SportRoomFormModal({ show, handleClose, handleSave, selectedSportRoom }) {
  const [formData, setFormData] = useState({
    sport_id: "",
    room_id: "",
    coach_id: "",
    status: true
  });

  const [rooms, setRooms] = useState([]);
  const [sports, setSports] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    if (show) {
      const fetchLists = async () => {
        try {
          // Traemos Salas
          const roomsRes = await getRooms();
          setRooms(Array.isArray(roomsRes) ? roomsRes : (roomsRes.data || []));

          // Traemos Deportes
          const sportsRes = await getSports();
          setSports(Array.isArray(sportsRes) ? sportsRes : (sportsRes.data || []));

          const usersRes = await getUsers();
          const allUsers = Array.isArray(usersRes) ? usersRes : (usersRes.data || []);
          const coachesList = allUsers.filter(user => user.role === 'coach' || user.role === 'Coach');
          setCoaches(coachesList);
        } catch (error) {
          console.error("Error al cargar las listas para los selectores:", error);
        }
      };
      fetchLists();
    }
  }, [show]);

  useEffect(() => {
    if (selectedSportRoom) {
      setFormData({
        sport_id: selectedSportRoom.sport_id || "",
        room_id: selectedSportRoom.room_id || "",
        coach_id: selectedSportRoom.coach_id || "",
        status: selectedSportRoom.status ?? true
      });
    } else {
      setFormData({ 
        sport_id: "", room_id: "", coach_id: "", status: true 
      });
    }
  }, [selectedSportRoom, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.sport_id || !formData.room_id || !formData.coach_id) {
      alert("Por favor, selecciona el Deporte, la Sala y el Coach.");
      return;
    }

    const dataToSend = {
      ...formData,
      sport_id: parseInt(formData.sport_id, 10),
      room_id: parseInt(formData.room_id, 10),
      coach_id: parseInt(formData.coach_id, 10)
    };

    handleSave(dataToSend);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-danger">
          {selectedSportRoom ? "Editar Asignación" : "Nueva Asignación"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Deporte</Form.Label>
                <Form.Select name="sport_id" value={formData.sport_id} onChange={handleChange} required>
                  <option value="">Selecciona un deporte...</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Sala</Form.Label>
                <Form.Select name="room_id" value={formData.room_id} onChange={handleChange} required>
                  <option value="">Selecciona una sala...</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} (Capacidad: {room.capacity})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Coach Asignado</Form.Label>
                <Form.Select name="coach_id" value={formData.coach_id} onChange={handleChange} required>
                  <option value="">Selecciona un coach...</option>
                  {coaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.full_name || coach.name || coach.email}
                    </option>
                  ))}
                </Form.Select>
                {coaches.length === 0 && (
                  <Form.Text className="text-danger">No se encontraron usuarios con rol "coach".</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3 mt-2">
            <Form.Check type="switch" id="sportroom-status-switch" label={formData.status ? "Estado: Activo" : "Estado: Inactivo"} name="status" checked={formData.status} onChange={handleChange} className={formData.status ? "text-success fw-bold" : "text-danger"} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="danger" type="submit">Guardar Asignación</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}