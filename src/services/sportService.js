const API_URL = "http://localhost:3000/api/sports";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getSports = async () => {
  const response = await fetch(API_URL, { headers: getAuthHeaders() });
  const data = await response.json(); // Leemos la respuesta primero
  
  if (!response.ok) {
    // Lanzamos el mensaje real del backend, o un genérico si no hay mensaje
    throw new Error(data.message || "Error al obtener los deportes");
  }
  return data;
};

export const createSport = async (sportData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(sportData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear el deporte. Verifica los datos ingresados.");
  }
  return data;
};

export const updateSport = async (id, sportData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(sportData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar el deporte. Verifica los datos.");
  }
  return data;
};

export const deleteSport = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al intentar eliminar este deporte.");
  }
  return data;
};

export const changeSportStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al cambiar el estado del deporte.");
  }
  return data;
};