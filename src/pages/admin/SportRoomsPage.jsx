import { useEffect, useState } from "react";
import { Container, Card, Button, Table, Spinner, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { getSportRooms, createSportRoom, updateSportRoom, deleteSportRoom } from "../../services/sportRoomService";
// Importaremos el modal que crearemos en el siguiente paso
import SportRoomFormModal from "../../components/sportRooms/SportRoomFormModal";

export default function SportRoomsPage() {
const [sportRooms, setSportRooms] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [selectedSportRoom, setSelectedSportRoom] = useState(null);

const brandPurple = "#4a3f5a";

const loadSportRooms = async () => {
    try {
    setLoading(true);
    const result = await getSportRooms();

    const dataArray = Array.isArray(result) ? result : (result.data || []);
    setSportRooms(dataArray);
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    setSportRooms([]);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    loadSportRooms();
}, []);

const handleOpenCreate = () => {
    setSelectedSportRoom(null);
    setShowModal(true);
};

const handleOpenEdit = (item) => {
    setSelectedSportRoom(item);
    setShowModal(true);
};

const handleSave = async (formData) => {
    try {
    if (selectedSportRoom) {
        await updateSportRoom(selectedSportRoom.id, formData);
        Swal.fire("Actualizado", "Asignación actualizada correctamente", "success");
    } else {
        await createSportRoom(formData);
        Swal.fire("Creado", "Asignación creada correctamente", "success");
    }
    setShowModal(false);
    loadSportRooms(); 
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    }
};

const handleDelete = async (item) => {
    const result = await Swal.fire({
    title: "¿Eliminar asignación?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
    try {
        await deleteSportRoom(item.id);
        Swal.fire("Eliminado", "Asignación eliminada correctamente", "success");
        loadSportRooms();
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
            <h4 className="mb-0 fw-bold">Gestión de Asignaciones (Deporte - Sala)</h4>
            <Button variant="danger" onClick={handleOpenCreate}>+ Nueva Asignación</Button>
            </Card.Header>
            <Card.Body>
            {loading ? (
                <div className="text-center p-4"><Spinner animation="border" /></div>
            ) : (
                <Table responsive hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Deporte</th>
                    <th>Sala</th>
                    <th>Coach</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sportRooms.map((item) => (
                    <tr key={item.id}>
                        <td className="fw-bold">#{item.id}</td>
                        <td>{item.sport?.name || item.sport_id || "N/A"}</td>
                        <td>{item.room?.name || item.room_id || "N/A"}</td>
                        <td>{item.coach?.full_name || item.coach_id || "N/A"}</td>
                        <td>
                        <Badge bg={item.status ? "success" : "secondary"}>
                            {item.status ? "Activo" : "Inactivo"}
                        </Badge>
                        </td>
                        <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleOpenEdit(item)}>Editar</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item)}>Eliminar</Button>
                        </td>
                    </tr>
                    ))}
                    {sportRooms.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center text-muted py-4">No hay asignaciones registradas.</td>
                    </tr>
                    )}
                </tbody>
                </Table>
            )}
            </Card.Body>
        </Card>
        </div>
    </Container>
    
    {showModal && (
        <SportRoomFormModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        handleSave={handleSave} 
        selectedSportRoom={selectedSportRoom} 
        />
    )}
    </div>
);
}