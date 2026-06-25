import { Link, Outlet, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authService"
import logo from "../assets/logo.png"

function CoachLayout() {
  const navigate = useNavigate()
  const user = getUser()

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand><img src={logo} alt="Logo" height="40" /></Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/coach/dashboard">Dashboard Coach</Link>
            {/* Nuevos enlaces agregados aquí */}
            <Link className="nav-link" to="/coach/calendario">Calendario</Link>
            <Link className="nav-link" to="/coach/perfil">Mi Perfil</Link>
          </Nav>
          <Nav className="align-items-center">
            <span className="text-white me-3">Hola, {user?.full_name}</span>
            <Button variant="outline-light" size="sm" onClick={() => { logout(); navigate("/login"); }}>
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
      
      {/* Eliminamos el Container con mt-4 para dejar que el Dashboard ocupe el fondo púrpura */}
      <Outlet />
    </>
  )
}
export default CoachLayout