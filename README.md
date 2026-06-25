# Proyecto SportClub - Frontend

## Descripción
Aplicación SPA desarrollada en React para la gestión de un club deportivo, incluyendo autenticación, control de acceso por roles (Admin, Coach, Usuario) y gestión de usuarios (CRUD).

## Integrante
- Alejandro Cantillanes

## Tecnologías Utilizadas
- React + Vite
- React-Bootstrap
- React Router DOM
- SweetAlert2

## ESTRUCTURA DEL TRABAJO
src/
│── assets/                # Imágenes, logos y recursos estáticos
│── components/            # Componentes reutilizables
│   └── users/
│       └── UserFormModal.jsx
│── layouts/               # Plantillas base (Navbars y contenedores)
│   ├── AdminLayout.jsx
│   ├── CoachLayout.jsx
│   └── UserLayout.jsx
│── pages/                 # Vistas principales de la aplicación organizadas por rol
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   └── UsersPage.jsx
│   ├── coach/
│   │   └── CoachDashboard.jsx
│   ├── user/
│   │   └── UserDashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Unauthorized.jsx
│── routes/                # Configuración de enrutamiento y protección
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleRoute.jsx
│── services/              # Peticiones HTTP al backend (Fetch/Axios)
│   ├── authService.js
│   └── userService.js
│── App.jsx                # Componente raíz
└── main.jsx               # Punto de entrada de React

## Modelo de usuario

```json
Administrador: admin1@demo.cl   

Coach: coach1@demo.cl

Usuario: user1@demo.cl

contra: 12345678
```


## Cómo instalar y ejecutar


### 1. Frontend
Abre una terminal en la carpeta del frontend y ejecuta:
```bash
npm install
npm run dev