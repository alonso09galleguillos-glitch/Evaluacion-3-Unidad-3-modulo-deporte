const API_URL = "http://localhost:3000/api/reservations"; // Ajustaremos este nombre si tu BD usa otro

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const extractError = (data, defaultMessage) => {
  let errorMessage = data.message || defaultMessage;
  const detailArray = data.errors || data.details;
  if (detailArray && Array.isArray(detailArray)) {
    errorMessage = `${errorMessage}:\n\n• ${detailArray.join("\n• ")}`;
  } else if (Array.isArray(data.message)) {
    errorMessage = `Por favor corrige lo siguiente:\n\n• ${data.message.join("\n• ")}`;
  } else if (typeof data.error === "string") {
    errorMessage = `${errorMessage} - ${data.error}`;
  }
  return errorMessage;
};

// Obtiene solo las reservas del usuario que inició sesión
export const getMyReservations = async () => {
  const response = await fetch(`${API_URL}/my-reservations`, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener tus reservas"));
  return data;
};

// Crea una nueva reserva (lo usaremos en el próximo paso)
export const createReservation = async (reservationData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reservationData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al crear la reserva"));
  return data;
};

// Cancela una reserva
export const cancelReservation = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al cancelar la reserva"));
  return data;
};