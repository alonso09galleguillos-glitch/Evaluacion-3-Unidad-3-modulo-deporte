const API_URL = "http://localhost:3000/api/users"

function getToken() {
return localStorage.getItem("token")
}

function getHeaders() {
return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
}
}

// 1. Obtener todos los usuarios
export async function getUsers() {
const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
})
if (!response.ok) {
    throw new Error("Error al obtener usuarios")
}
return response.json()
}

// 2. Crear un nuevo usuario
export async function createUser(userData) {
const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
})
const data = await response.json()
if (!response.ok) {
    throw new Error(data.message || "Error al crear usuario")
}
return data
}

// 3. Actualizar un usuario existente
export async function updateUser(id, userData) {
const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
})
const data = await response.json()
if (!response.ok) {
    throw new Error(data.message || "Error al actualizar usuario")
}
return data
}

// 4. Eliminar un usuario
export async function deleteUser(id) {
const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
})
if (!response.ok) {
    throw new Error("Error al eliminar usuario")
}
return true
}