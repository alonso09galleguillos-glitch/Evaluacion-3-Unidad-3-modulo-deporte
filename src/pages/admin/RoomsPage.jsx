import { useEffect, useState } from "react";
import { Container, Card, Button, Table, Spinner, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../../services/roomService";
import RoomFormModal from "../../components/rooms/RoomFormModal";

export default function RoomsPage() {
const [rooms, setRooms] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [selectedRoom, setSelectedRoom] = useState(null);

const brandPurple = "#4a3f5a";

const loadRooms = async () => {
    try {
    setLoading(true);
    const result = await getRooms();
      // Verificamos de forma segura cómo viene la información del backend
    const roomsArray = Array.isArray(result) ? result : (result.data || []);
    setRooms(roomsArray);
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    setRooms([]);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    loadRooms();
}, []);

const handleOpenCreate = () => {
    setSelectedRoom(null);
    setShowModal(true);
};

const handleOpenEdit = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
};


const handleSave = async (formData) => {
    try {
    if (selectedRoom) {
        // Si hay una sala seleccionada, la actualiza
        await updateRoom(selectedRoom.id, formData);
        Swal.fire("Actualizado", "Sala actualizada correctamente", "success");
    } else {

        await createRoom(formData);
        Swal.fire("Creado", "Sala creada correctamente", "success");
    }
    
    setShowModal(false);
    loadRooms(); 
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    }
};

const handleDelete = async (room) => {
    const result = await Swal.fire({
    title: "¿Eliminar sala?",
    text: `Se eliminará: ${room.name}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
    try {
        await deleteRoom(room.id);
        Swal.fire("Eliminado", "Sala eliminada correctamente", "success");
        loadRooms(); // Recargamos la tabla al eliminar
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
    }
};

return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
    <Container fluid>
        <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "1.5rem", maxWidth: "1200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}>
        <Card className="border-0">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0 pb-3">
            <h4 className="mb-0 fw-bold">Gestión de Salas</h4>
            <Button variant="danger" onClick={handleOpenCreate}>+ Nueva Sala</Button>
            </Card.Header>
            <Card.Body>
            {loading ? (
                <div className="text-center p-4"><Spinner animation="border" /></div>
            ) : (
                <Table responsive hover>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Ubicación</th>
                    <th>Capacidad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                    <tr key={room.id}>
                        <td className="fw-bold">{room.name}</td>
                        <td>{room.location}</td>
                        <td>{room.capacity} personas</td>
                        <td>
                        <Badge bg={room.status ? "success" : "secondary"}>
                            {room.status ? "Operativa" : "Fuera de servicio"}
                        </Badge>
                        </td>
                        <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenEdit(room)}>Editar</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(room)}>Eliminar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            )}
            </Card.Body>
        </Card>
        </div>
    </Container>
    

    <RoomFormModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        handleSave={handleSave} 
        selectedRoom={selectedRoom} 
    />
    </div>
);
}