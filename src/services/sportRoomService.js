const API_URL = "http://localhost:3000/api/sport-rooms";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Reutilizamos nuestra función estrella para extraer los detalles de los errores
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

// --- Operaciones CRUD ---

export const getSportRooms = async () => {
  const response = await fetch(API_URL, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener las asignaciones"));
  return data;
};

export const getSportRoomById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener la asignación"));
  return data;
};

export const createSportRoom = async (sportRoomData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(sportRoomData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al crear la asignación. Revisa los datos."));
  return data;
};

export const updateSportRoom = async (id, sportRoomData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(sportRoomData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al actualizar la asignación."));
  return data;
};

export const deleteSportRoom = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al eliminar la asignación."));
  return data;
};