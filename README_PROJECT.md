# WhiteStar E-commerce

Plataforma de comercio electrónico completa de nivel TRL-5.

## Tecnologías

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Base de Datos**: MySQL + Sequelize ORM
- **Autenticación**: JWT
- **Seguridad**: Helmet, bcrypt, express-validator

## Documentación

- [Manual de Instalación](README.md) - Guía completa de instalación local
- [Guía de Despliegue](DEPLOYMENT.md) - Despliegue en Vercel + Railway
- [Estructura del Proyecto](PROJECT_STRUCTURE.md) - Arquitectura del código
- [Usuarios de Prueba](backend/SEED_USERS_README.md) - Credenciales de testing

## Inicio Rápido

### Desarrollo Local

```bash
# Backend
cd backend
npm install
npm run migrate
npm run seed
npm run create-admin
npm run dev

# Frontend (nueva terminal)
cd frontend
npm install
npm run dev
```

### Producción

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones de despliegue en Vercel y Railway.

## Características

- Catálogo de productos con búsqueda y filtros
- Carrito de compras
- Sistema de pedidos
- Panel de administración
- Gestión de inventario
- Reportes y análisis
- Sistema de reservas
- Gestión de promociones
- Atención al cliente

## Licencia

MIT

## Equipo

Full-Stack Development Team
