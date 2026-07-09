import { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Spinner } from "react-bootstrap";
import { getMyReservations, cancelReservation, createReservation } from "../../services/reservationService";
import ReservationFormModal from "../../components/reservations/ReservationFormModal";
import Swal from "sweetalert2";

export default function MyReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = async () => {
        try {
            setLoading(true);
            const res = await getMyReservations();
            
            const allReservations = res.data || res || [];
            const activeReservations = allReservations.filter(reserva => reserva.status === "active");
            
            setReservations(activeReservations);
        } catch (error) {
            console.error("Error al cargar reservas:", error);
            Swal.fire("Error", "No se pudieron cargar tus reservas.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSaveReservation = async (reservationData) => {
        try {
            await createReservation(reservationData);
            Swal.fire("¡Éxito!", "Reserva creada correctamente.", "success");
            handleCloseModal();
            loadReservations();
        } catch (error) {
            Swal.fire("Error", error.message || "No se pudo crear la reserva.", "error");
        }
    };

    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Se cancelará esta reserva.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        });

        if (result.isConfirmed) {
            try {
                await cancelReservation(id);
                Swal.fire('Cancelada', 'Tu reserva ha sido cancelada.', 'success');
                loadReservations();
            } catch (error) {
                Swal.fire('Error', error.message || 'No se pudo cancelar la reserva.', 'error');
            }
        }
    };

    const getDayName = (dayNumber) => {
        const days = {
            1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado", 7: "Domingo"
        };
        return days[dayNumber] || "Día no definido";
    };

    return (
        <Container className="mt-4">
            <div className="bg-white p-4 rounded shadow-sm">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold mb-0">Mis Reservas</h3>
                    <Button variant="success" onClick={handleOpenModal}>
                        + Crear Reserva
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="success" />
                    </div>
                ) : (
                    <Table responsive hover className="align-middle">
                        <thead>
                            <tr>
                                <th>Día y Hora</th>
                                <th>Deporte</th>
                                <th>Sala</th>
                                <th>Coach</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                        No tienes reservas activas en este momento.
                                    </td>
                                </tr>
                            ) : (
                                reservations.map((res) => {
                                    const schedule = res.classSchedule || res.class_schedule || {};
                                    const sportRoom = schedule.sportRoom || schedule.SportRoom || {};
                                    const sport = sportRoom.sport || sportRoom.Sport || {};
                                    const room = sportRoom.room || sportRoom.Room || {};
                                    const coach = sportRoom.coach || sportRoom.Coach || {};

                                    const dayName = schedule.day_of_week ? getDayName(schedule.day_of_week) : "Sin día";
                                    const startTime = schedule.start_time ? schedule.start_time.substring(0, 5) : "";
                                    const endTime = schedule.end_time ? schedule.end_time.substring(0, 5) : "";
                                    const timeString = startTime ? `${startTime} - ${endTime}` : "";

                                    const sportName = sport.name || (schedule.sport_room_id ? `Clase #${schedule.sport_room_id}` : "No especificado");
                                    const roomName = room.name || "No especificado";
                                    
                                    // 👇 CORRECCIÓN: Leemos el email del coach ya que el backend no envía el nombre 👇
                                    const coachName = coach.email ? coach.email.split('@')[0] : (coach.id ? `Coach #${coach.id}` : "No asignado");

                                    const isActive = res.status === "active";

                                    return (
                                        <tr key={res.id}>
                                            <td className="fw-bold text-nowrap">{dayName} <br /><small className="text-muted">{timeString}</small></td>
                                            <td>{sportName}</td>
                                            <td>{roomName}</td>
                                            <td className="text-capitalize">{coachName}</td>
                                            <td>
                                                <Badge bg={isActive ? "success" : "secondary"}>
                                                    {isActive ? "Activa" : "Cancelada"}
                                                </Badge>
                                            </td>
                                            <td>
                                                {isActive && (
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleCancel(res.id)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </Table>
                )}
            </div>

            <ReservationFormModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSave={handleSaveReservation}
            />
        </Container>
    );
}