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
  
  const brandPurple = "#4a3f5a"; // Color púrpura

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
    try {
      if (selectedUser) {
        // 👇 AQUÍ ESTÁ EL RASTREADOR DEL BUG 👇
        console.log("🛠️ DEBUG - ID SELECCIONADO:", selectedUser.id);
        console.log("🛠️ DEBUG - DATOS A ENVIAR:", formData);

        await updateUser(selectedUser.id, formData)
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success")
      } else {
        await createUser(formData)
        Swal.fire("Creado", "Usuario creado correctamente", "success")
      }
      closeModal()
      loadUsers()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
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
        {/* Recuadro blanco con bordes negros */}
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