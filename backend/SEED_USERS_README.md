# 🌱 Script de Seed de Usuarios - WhiteStar

Este script crea usuarios de prueba en la base de datos para facilitar el desarrollo y testing.

## 📋 Usuarios Creados

### Usuarios Administrativos (5)
- **Admin**: admin@whitestar.com
- **Gerente**: gerente@whitestar.com
- **Vendedor**: vendedor@whitestar.com
- **Administrador de Stock**: stock@whitestar.com
- **Atención al Cliente**: atencion@whitestar.com

### Clientes (10)
1. juan.perez@gmail.com
2. maria.gonzalez@gmail.com
3. luis.rodriguez@gmail.com
4. carmen.martinez@gmail.com
5. roberto.fernandez@gmail.com
6. patricia.lopez@gmail.com
7. diego.sanchez@gmail.com
8. valentina.torres@gmail.com
9. andres.ramirez@gmail.com
10. sofia.herrera@gmail.com

## 🔑 Credenciales

**Contraseña para todos los usuarios**: `password123`

## 🚀 Cómo Usar

### Opción 1: Usando npm script (Recomendado)
```bash
cd backend
npm run seed-users
```

### Opción 2: Ejecutar directamente
```bash
cd backend
node seed_users.js
```

## ⚠️ Requisitos Previos

1. **Base de datos configurada**: Asegúrate de tener el archivo `.env` configurado correctamente
2. **Roles creados**: Los roles deben existir en la base de datos. Si no existen, ejecuta primero:
   ```bash
   npm run migrate
   ```

## 📝 Notas

- El script **NO sobrescribe** usuarios existentes
- Si un email ya existe, ese usuario será omitido
- Todos los usuarios se crean con estado `is_active: true`
- Las contraseñas están hasheadas con bcrypt

## 🔄 Re-ejecutar el Script

Puedes ejecutar el script múltiples veces sin problemas. Solo creará los usuarios que no existan.

## 🧪 Testing de Roles

Usa estos usuarios para probar las diferentes funcionalidades según el rol:

### Admin / Gerente
- Gestión completa del sistema
- Reportes y análisis
- Gestión de usuarios
- Gestión de tareas

### Vendedor
- Gestión de productos
- Gestión de promociones
- Procesamiento de reservas

### Administrador de Stock
- Gestión de inventario
- Alertas de stock bajo
- Movimientos de stock

### Atención al Cliente
- Gestión de reclamos
- Seguimiento de pedidos
- Búsqueda de clientes

### Cliente
- Navegación del catálogo
- Carrito de compras
- Reservas y pedidos
- Perfil personal

## 🐛 Troubleshooting

### Error: "Faltan roles en la base de datos"
**Solución**: Ejecuta primero `npm run migrate` para crear los roles

### Error: "Cannot connect to database"
**Solución**: Verifica tu archivo `.env` y que MySQL esté corriendo

### Error: "bcrypt error"
**Solución**: Reinstala bcryptjs: `npm install bcryptjs`

## 📞 Soporte

Si encuentras algún problema, verifica:
1. Que la base de datos esté corriendo
2. Que las credenciales en `.env` sean correctas
3. Que los roles existan en la base de datos
