import { BrowserRouter, Routes, Route } from "react-router-dom"

// --- Importaciones de Páginas Públicas ---
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register" 
import RecoverPassword from "../pages/RecoverPassword"
import Unauthorized from "../pages/Unauthorized"

// --- Importaciones de Dashboards ---
import UserDashboard from "../pages/user/UserDashboard"
import CoachDashboard from "../pages/coach/CoachDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"
import UsersPage from "../pages/admin/UsersPage"
import SportsPage from "../pages/admin/SportsPage" 


import AdminCalendarPage from "../pages/admin/AdminCalendarPage"
import AdminProfilePage from "../pages/admin/AdminProfilePage"
import CoachCalendarPage from "../pages/coach/CoachCalendarPage"
import CoachProfilePage from "../pages/coach/CoachProfilePage"
import UserCalendarPage from "../pages/user/UserCalendarPage"
import UserProfilePage from "../pages/user/UserProfilePage"


// --- Importaciones de Layouts ---
import UserLayout from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"

// --- Importaciones de Seguridad ---
import ProtectedRoute from "./ProtectedRoute"
import RoleRoute from "./RoleRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas Privadas por Rol */}
        <Route path="/user" element={<RoleRoute allowedRoles={["user"]}><UserLayout /></RoleRoute>}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="calendario" element={<UserCalendarPage />} />
          <Route path="perfil" element={<UserProfilePage />} />
        </Route>

        <Route path="/coach" element={<RoleRoute allowedRoles={["coach"]}><CoachLayout /></RoleRoute>}>
          <Route path="dashboard" element={<CoachDashboard />} />
          <Route path="calendario" element={<CoachCalendarPage />} />
          <Route path="perfil" element={<CoachProfilePage />} />
        </Route>

        {/* RUTAS DEL ADMINISTRADOR */}
        <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminLayout /></RoleRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="calendario" element={<AdminCalendarPage />} />
          <Route path="perfil" element={<AdminProfilePage />} />
          
          {/* 👇 NUEVA RUTA PROTEGIDA DE DEPORTES 👇 */}
          <Route path="deportes" element={<SportsPage />} />
        </Route>

        {/* Ruta Privada General */}
        <Route path="/perfil" element={<ProtectedRoute><h1>Perfil del usuario autenticado</h1></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes