import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Alert, Button, Card, Container, Form, Spinner, Navbar, Nav } from "react-bootstrap"
import Swal from "sweetalert2"
import { registerUser } from "../services/authService"
import logo from "../assets/logo.png"

export default function Register() {
const navigate = useNavigate()
const [fullName, setFullName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [birthDate, setBirthDate] = useState("")
const [phone, setPhone] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const brandPurple = "#4a3f5a"

const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) return setError("Las contraseñas no coinciden.")
    setLoading(true)
    try {
    await registerUser({ full_name: fullName, email, password, role: "user", birth_date: birthDate })
    Swal.fire({ title: "¡Éxito!", text: "Cuenta creada. Inicia sesión.", icon: "success", confirmButtonColor: brandPurple })
    navigate("/login")
    } catch (error) {
    setError(error.message)
    } finally {
    setLoading(false)
    }
}

return (
    <div style={{ backgroundColor: brandPurple, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
        <Navbar.Brand><img src={logo} alt="Logo" height="40" /></Navbar.Brand>
        <Nav className="ms-auto">
            <Link to="/" className="text-decoration-none"><Button variant="warning" className="fw-bold">Volver al Inicio</Button></Link>
        </Nav>
        </Container>
    </Navbar>

    <Container className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <Card style={{ width: "28rem", borderRadius: "10px", border: "2px solid #343a40" }} className="shadow-lg">
        <Card.Body className="p-4">
            <div className="text-center mb-3"><img src={logo} alt="Logo" style={{ maxHeight: "60px" }} /></div>
            <Card.Title className="text-center mb-3 fw-bold fs-3">Registro</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Nombre completo:</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ border: "2px solid black" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Email/Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: "2px solid black" }} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Contraseña:</Form.Label>
                <Form.Control type="password" placeholder="Mínimo 8 caracteres (letras y números)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: "2px solid black" }} minLength={8} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Confirmar contraseña:</Form.Label>
                <Form.Control type="password" placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ border: "2px solid black" }} minLength={8} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Fecha de nacimiento (opcional):</Form.Label>
                <Form.Control type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={{ border: "2px solid black" }} />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Número de teléfono (opcional):</Form.Label>
                <Form.Control type="tel" placeholder="+56912345678" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ border: "2px solid black" }} />
            </Form.Group>
            <Button type="submit" className="w-100 fw-bold border-dark text-white mb-3" style={{ backgroundColor: brandPurple }} disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "Registrarse"}
            </Button>
            <div className="text-center"><Link to="/login" className="small fw-bold" style={{ color: brandPurple }}>Volver al login</Link></div>
            </Form>
        </Card.Body>
        </Card>
    </Container>
    </div>
)
}