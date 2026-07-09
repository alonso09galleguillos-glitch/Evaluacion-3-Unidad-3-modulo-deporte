const API_URL = "/api/reservations"; // <-- Ruta relativa para AWS/Nginx

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

export const getMyReservations = async () => {
  const response = await fetch(`${API_URL}/my-reservations`, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener tus reservas"));
  return data;
};

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

// 👇 AQUÍ ESTÁ LA CORRECCIÓN: Volvimos a poner el método PATCH y la ruta /cancel 👇
export const cancelReservation = async (id) => {
  const response = await fetch(`${API_URL}/${id}/cancel`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al cancelar la reserva"));
  return data;
};