import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authService"
import logo from "../assets/logo.png"

function AdminLayout() {
  const navigate = useNavigate()
  const user = getUser()

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="Logo" height="40" />
          </Navbar.Brand>
          
          <Nav className="me-auto">
            <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/admin/users">Usuarios</Link>
            
            {/* 👇 AQUÍ ESTÁ EL NUEVO ENLACE DE DEPORTES 👇 */}
            <Link className="nav-link" to="/admin/deportes"></Link>
            
            <Link className="nav-link" to="/admin/calendario">Calendario</Link>
            <Link className="nav-link" to="/admin/perfil">Mi Perfil</Link>
          </Nav>
          
          <Nav className="align-items-center">
            <span className="text-white me-3">Hola, {user?.full_name}</span>
            <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate("/login"); }}>
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
      
      {/* Outlet libre para que las vistas ocupen el fondo púrpura */}
      <Outlet />
    </>
  )
}

export default AdminLayout