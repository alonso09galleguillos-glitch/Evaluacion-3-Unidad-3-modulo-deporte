import { useEffect, useState } from "react";
import { Container, Card, Button, Table, Spinner, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { getMyReservations, cancelReservation, createReservation } from "../../services/reservationService";
import ReservationFormModal from "../../components/reservations/ReservationFormModal";

export default function MyReservationsPage() {
const [reservations, setReservations] = useState([]);
const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

const brandPurple = "#4a3f5a";

const loadReservations = async () => {
    try {
    setLoading(true);
    const result = await getMyReservations();
    const dataArray = Array.isArray(result) ? result : (result.data || []);
    setReservations(dataArray);
    } catch (error) {
    Swal.fire("Error", error.message, "error");
    setReservations([]);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    loadReservations();
}, []);

const handleCreate = async (formData) => {
    try {
    await createReservation(formData);
    Swal.fire("¡Reserva Confirmada!", "Tu cupo ha sido guardado exitosamente.", "success");
    setShowModal(false);
    loadReservations(); 
    } catch (error) {
    Swal.fire("Error al reservar", error.message, "error");
    }
};

const handleCancel = async (reservation) => {
    const result = await Swal.fire({
    title: "¿Cancelar tu reserva?",
    text: "Liberarás tu cupo en esta clase para que otra persona pueda asistir.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar reserva",
    cancelButtonText: "No, mantenerla",
    confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
    try {
        await cancelReservation(reservation.id);
        Swal.fire("Cancelada", "Tu reserva ha sido cancelada correctamente.", "success");
        loadReservations();
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "Fecha no asignada";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
};

return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
    <Container fluid>
        <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "1.5rem", maxWidth: "1200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}>
        <Card className="border-0">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0 pb-3">
            <h4 className="mb-0 fw-bold">Mis Reservas</h4>
              {/* 👇 Botón Actualizado que abre el Modal 👇 */}
            <Button variant="success" onClick={() => setShowModal(true)}>+ Crear Reserva</Button>
            </Card.Header>
            <Card.Body>
            {loading ? (
                <div className="text-center p-4"><Spinner animation="border" variant="success" /></div>
            ) : (
                <Table responsive hover>
                <thead>
                    <tr>
                    <th>Fecha y Hora</th>
                    <th>Deporte</th>
                    <th>Sala</th>
                    <th>Coach</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => {
                    const date = res.date || res.schedule?.date;
                    const time = res.time || res.schedule?.time || "";
                    const sport = res.sportRoom?.sport?.name || res.schedule?.sportRoom?.sport?.name || "No especificado";
                    const room = res.sportRoom?.room?.name || res.schedule?.sportRoom?.room?.name || "No especificado";
                    const coach = res.sportRoom?.coach?.full_name || res.schedule?.sportRoom?.coach?.full_name || "No asignado";

                    return (
                        <tr key={res.id}>
                        <td className="fw-bold">{formatDate(date)} {time && `- ${time}`}</td>
                        <td>{sport}</td>
                        <td>{room}</td>
                        <td>{coach}</td>
                        <td>
                            <Badge bg={res.status === 'active' || res.status === true ? "success" : "danger"}>
                            {res.status === 'active' || res.status === true ? "Confirmada" : "Cancelada"}
                            </Badge>
                        </td>
                        <td>
                            {(res.status === 'active' || res.status === true) && (
                            <Button variant="danger" size="sm" onClick={() => handleCancel(res)}>Cancelar</Button>
                            )}
                        </td>
                        </tr>
                    );
                    })}
                    {reservations.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center text-muted py-4">No tienes reservas activas en este momento.</td>
                    </tr>
                    )}
                </tbody>
                </Table>
            )}
            </Card.Body>
        </Card>
        </div>
    </Container>


    <ReservationFormModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        handleSave={handleCreate} 
    />
    </div>
);
}