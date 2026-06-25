import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authService"
import logo from "../assets/logo.png"

function UserLayout() {
  const navigate = useNavigate()
  const user = getUser()

  return (
    <>
      {/* El Navbar queda igual */}
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand><img src={logo} alt="Logo" height="40" /></Navbar.Brand>
          
          <Nav className="me-auto">
            <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
            {/* Nuevas pestañas añadidas aquí */}
            <Link className="nav-link" to="/user/calendario">Calendario</Link>
            <Link className="nav-link" to="/user/perfil">Mi Perfil</Link>
          </Nav>
          
          <Nav className="align-items-center">
            <span className="text-white me-3">Hola, {user?.full_name}</span>
            <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate("/login"); }}>
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
      
      {/* QUITAMOS el Container y el mt-4. Solo dejamos el Outlet */}
      <Outlet />
    </>
  )
}

export default UserLayout