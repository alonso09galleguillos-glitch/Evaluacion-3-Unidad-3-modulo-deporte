import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Alert, Button, Card, Container, Form, Spinner, Navbar, Nav } from "react-bootstrap"
import Swal from "sweetalert2"
import { loginUser, saveSession } from "../services/authService"
import logo from "../assets/logo.png"

function Login() {
const navigate = useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const brandPurple = "#4a3f5a"

const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    if (!email || !password) {
    return Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, ingresa tu correo y contraseña para continuar.",
        confirmButtonColor: brandPurple
    })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
    return Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Asegúrate de escribir un correo electrónico válido (ejemplo: usuario@correo.com).",
        confirmButtonColor: brandPurple
    })
    }
    // ------------------------------------

    setLoading(true)

    try {
    const data = await loginUser({ email, password })
    saveSession(data.data.token, data.data.user)

    if (data.data.user.role === "admin") {
        navigate("/admin/dashboard")
    } else if (data.data.user.role === "coach") {
        navigate("/coach/dashboard")
    } else {
        navigate("/user/dashboard")
    }
    } catch (error) {

    Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: error.message || "Credenciales incorrectas. Verifica tu correo y contraseña.",
        confirmButtonColor: brandPurple
    })
    setError(error.message)
    } finally {
    setLoading(false)
    }
}

return (
    <div style={{ backgroundColor: brandPurple, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    
      {/* Barra superior de navegación */}
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
        <Navbar.Brand>
            <img
            src={logo}
            alt="Logo SportClub"
            height="40"
            className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Nav className="ms-auto">
            <Link to="/" className="text-decoration-none">
            <Button variant="warning" className="fw-bold">Volver al Inicio</Button>
            </Link>
        </Nav>
        </Container>
    </Navbar>

    <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <Card style={{ width: "26rem", borderRadius: "10px", border: "2px solid #343a40" }} className="shadow-lg">
        <Card.Body className="p-4">
            
            <div className="text-center mb-3">
            <img 
                src={logo} 
                alt="Logo SportClub" 
                style={{ maxHeight: "70px", maxWidth: "100%" }} 
            />
            </div>

            <Card.Title className="text-center mb-4 fw-bold fs-3">Inicio de sesión</Card.Title>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Email:</Form.Label>
                <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "2px solid black", borderRadius: "6px" }}
                required
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Contraseña:</Form.Label>
                <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "2px solid black", borderRadius: "6px" }}
                required
                />
            </Form.Group>

            <Button 
                type="submit" 
                className="w-100 fw-bold border-dark text-white mb-4" 
                style={{ backgroundColor: brandPurple, borderRadius: "6px" }} 
                disabled={loading}
            >
                {loading ? (
                <>
                    <Spinner size="sm" animation="border" /> Ingresando...
                </>
                ) : (
                "Ingresar"
                )}
            </Button>

            <div className="text-center d-flex justify-content-center align-items-center gap-2">
                <Link to="/recover-password" className="small text-decoration-none fw-semibold" style={{ color: "#0d6efd" }}>
                ¿Olvidaste tu contraseña?
                </Link>
                <span className="small text-muted">|</span>
                <Link to="/register" className="small text-decoration-none fw-semibold" style={{ color: "#0d6efd" }}>
                Registrarse
                </Link>
            </div>

            </Form>
        </Card.Body>
        </Card>
    </Container>
    </div>
)
}

export default Login