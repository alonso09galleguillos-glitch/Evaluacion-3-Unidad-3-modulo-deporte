import { useEffect, useState } from "react"
import { Badge, Button, Card, Spinner, Table, Container } from "react-bootstrap"
import Swal from "sweetalert2"
import UserFormModal from "../../components/users/UserFormModal"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/userService"

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  
  const brandPurple = "#4a3f5a";

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data.data)
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const openCreateModal = () => {
    setSelectedUser(null)
    setShowModal(true)
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleSave = async (formData) => {
    // --- NUEVAS VALIDACIONES FRONTEND (Pre-vuelo) ---
    // 1. Validar campos vacíos
    if (!formData.full_name || !formData.email || !formData.role) {
      return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "El nombre, el correo y el rol son obligatorios.",
        confirmButtonColor: brandPurple
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Asegúrate de escribir un correo electrónico válido.",
        confirmButtonColor: brandPurple
      })
    }

    if (!selectedUser && (!formData.password || formData.password.length < 8)) {
      return Swal.fire({
        icon: "warning",
        title: "Contraseña inválida",
        text: "Para un usuario nuevo, la contraseña debe tener al menos 8 caracteres.",
        confirmButtonColor: brandPurple
      })
    }
    // ------------------------------------------------

    try {
      if (selectedUser) {
        console.log("🛠️ DEBUG - ID SELECCIONADO:", selectedUser.id);
        console.log("🛠️ DEBUG - DATOS A ENVIAR:", formData);

        await updateUser(selectedUser.id, formData)
        Swal.fire({
          title: "Actualizado", 
          text: "El usuario fue modificado correctamente.", 
          icon: "success",
          confirmButtonColor: brandPurple
        })
      } else {
        await createUser(formData)
        Swal.fire({
          title: "Creado", 
          text: "El nuevo usuario fue registrado con éxito.", 
          icon: "success",
          confirmButtonColor: brandPurple
        })
      }
      closeModal()
      loadUsers()
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: error.message || "Hubo un problema. Verifica que el correo no esté ya en uso.",
        confirmButtonColor: brandPurple
      })
    }
  }

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${user.full_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    })

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id)
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success")
        loadUsers()
      } catch (error) {
        Swal.fire("Error", error.message, "error")
      }
    }
  }

  return (
    <div style={{ backgroundColor: brandPurple, minHeight: "calc(100vh - 56px)", padding: "40px 20px" }}>
      <Container fluid>
        <div style={{ 
          backgroundColor: "white", 
          border: "3px solid black", 
          borderRadius: "15px", 
          padding: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
        }}>
          
          <Card className="border-0">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0">
              <h4 className="mb-0 fw-bold">Gestión de Usuarios</h4>
              <Button variant="primary" onClick={openCreateModal}>
                Nuevo Usuario
              </Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" />
                  <p className="mt-2">Cargando usuarios...</p>
                </div>
              ) : (
                <Table responsive striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Badge bg={user.role === "admin" ? "success" : user.role === "user" ? "info" : "secondary"}>
                            {user.role === "admin" ? "Administrador" : user.role === "user" ? "Usuario" : "Coach"}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => openEditModal(user)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

          <UserFormModal
            show={showModal}
            handleClose={closeModal}
            handleSave={handleSave}
            selectedUser={selectedUser}
          />
        </div>
      </Container>
    </div>
  )
}

export default UsersPage