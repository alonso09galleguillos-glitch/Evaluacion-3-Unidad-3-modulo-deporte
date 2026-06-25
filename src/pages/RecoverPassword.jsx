import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Container, Form, Navbar, Nav } from "react-bootstrap"
import Swal from "sweetalert2"
import logo from "../assets/logo.png"

export default function RecoverPassword() {
const [email, setEmail] = useState("")
const navigate = useNavigate()
const brandPurple = "#4a3f5a"

const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({ title: "Correo enviado", text: "Revisa tu bandeja de entrada.", icon: "success", confirmButtonColor: brandPurple }).then(() => navigate("/login"))
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
        <Card style={{ width: "26rem", borderRadius: "10px", border: "2px solid #343a40" }} className="shadow-lg">
        <Card.Body className="p-4">
            <div className="text-center mb-3"><img src={logo} alt="Logo" style={{ maxHeight: "60px" }} /></div>
            <Card.Title className="text-center mb-3 fw-bold fs-3">Recuperar contraseña</Card.Title>
            
            {/* Texto recuperado */}
            <p className="text-center text-muted small mb-4">
            Ingresa tu correo electrónico y te enviaremos un enlace de verificación.
            </p>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Label className="small fw-semibold">Email:</Form.Label>
                <Form.Control 
                type="email" 
                  placeholder="Ingresa tu correo" /* Placeholder recuperado */
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ border: "2px solid black" }} 
                required 
                />
            </Form.Group>
            <Button type="submit" className="w-100 fw-bold border-dark text-white mb-3" style={{ backgroundColor: brandPurple }}>Enviar instrucciones</Button>
            <div className="text-center"><Link to="/login" className="small fw-bold" style={{ color: brandPurple }}>Volver al login</Link></div>
            </Form>
        </Card.Body>
        </Card>
    </Container>
    </div>
)
}