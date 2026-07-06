const API_URL = "http://localhost:3000/api/rooms";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// 👇 NUEVA FUNCIÓN EXTRACTORA DE ERRORES 👇
// Esta función lee la respuesta de tu backend y busca dónde están escondidos los detalles
const extractError = (data, defaultMessage) => {
  let errorMessage = data.message || defaultMessage;

  // 1. Si el backend envía los errores en un arreglo llamado "errors" o "details"
  const detailArray = data.errors || data.details;
  if (detailArray && Array.isArray(detailArray)) {
    errorMessage = `${errorMessage}:\n\n• ${detailArray.join("\n• ")}`;
  } 
  // 2. Si el backend (ej: NestJS) envía el propio "message" como un arreglo
  else if (Array.isArray(data.message)) {
    errorMessage = `Por favor corrige lo siguiente:\n\n• ${data.message.join("\n• ")}`;
  }
  // 3. Si envía un solo error en un campo "error"
  else if (typeof data.error === "string") {
    errorMessage = `${errorMessage} - ${data.error}`;
  }

  return errorMessage;
};

export const getRooms = async () => {
  const response = await fetch(API_URL, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener las salas"));
  return data;
};

export const getRoomById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al obtener la sala"));
  return data;
};

export const createRoom = async (roomData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(roomData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al crear la sala"));
  return data;
};

export const updateRoom = async (id, roomData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(roomData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al actualizar la sala"));
  return data;
};

export const deleteRoom = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(extractError(data, "Error al eliminar la sala"));
  return data;
};