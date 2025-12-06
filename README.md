# Manual de Instalación - WhiteStar 

## Introducción

**WhiteStar** es una plataforma de comercio electrónico completa de nivel TRL-5 (Technology Readiness Level 5), diseñada para proporcionar una experiencia de compra moderna y segura. El sistema está construido con una arquitectura cliente-servidor, utilizando tecnologías web modernas para ofrecer funcionalidades avanzadas de gestión de productos, pedidos, pagos, inventario y administración.

### Propósito del Software

WhiteStar permite a las empresas:
- Gestionar un catálogo completo de productos con imágenes y descripciones
- Procesar pedidos y pagos de forma segura
- Administrar inventario con alertas de stock bajo
- Gestionar usuarios, roles y permisos
- Generar reportes y análisis de ventas
- Manejar reservas de productos
- Gestionar promociones y descuentos
- Procesar quejas y reclamos de clientes

---

## Documentación Disponible

- **[QUICKSTART.md](QUICKSTART.md)** - Guía de inicio rápido (< 5 minutos)
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Estructura del proyecto
- **[backend/SEED_USERS_README.md](backend/SEED_USERS_README.md)** - Usuarios de prueba
- **README.md** (este archivo) - Manual completo de instalación

> **Consejo**: Si es su primera vez, comience con [QUICKSTART.md](QUICKSTART.md) para una instalación rápida.



---

## Requisitos del Sistema

### Requisitos Mínimos de Hardware

- **Procesador**: Intel Core i3 o equivalente (2.0 GHz o superior)
- **Memoria RAM**: 4 GB mínimo (8 GB recomendado)
- **Espacio en Disco**: 2 GB de espacio libre
- **Conexión a Internet**: Requerida para instalación de dependencias

### Requisitos de Software

#### Sistema Operativo
- Windows 10/11 (64-bit)
- macOS 10.15 o superior
- Linux (Ubuntu 20.04 LTS o superior, Debian, Fedora, etc.)

#### Software Requerido

1. **Node.js** (versión 20.0.0 o superior)
   - Descarga: https://nodejs.org/
   - Incluye npm (Node Package Manager)

2. **MySQL** (versión 8.0 o superior)
   - Descarga: https://dev.mysql.com/downloads/mysql/
   - O utilizar XAMPP/WAMP que incluye MySQL

3. **Git** (opcional, para control de versiones)
   - Descarga: https://git-scm.com/downloads

4. **Navegador Web Moderno**
   - Google Chrome (versión 90+)
   - Mozilla Firefox (versión 88+)
   - Microsoft Edge (versión 90+)
   - Safari (versión 14+)

#### Herramientas Adicionales Recomendadas

- **Visual Studio Code** o cualquier editor de código
- **Postman** o **Thunder Client** para pruebas de API
- **MySQL Workbench** para gestión de base de datos

---

## Proceso de Instalación

### Paso 1: Verificar Requisitos Previos

#### 1.1 Verificar Node.js

Abra una terminal/consola de comandos y ejecute:

```bash
node --version
```

Debe mostrar una versión 20.0.0 o superior. Si no está instalado:
- Descargue Node.js desde https://nodejs.org/
- Instale la versión LTS (Long Term Support)
- Reinicie la terminal después de la instalación

#### 1.2 Verificar npm

```bash
npm --version
```

Debe mostrar la versión de npm (generalmente se instala automáticamente con Node.js).

#### 1.3 Verificar MySQL

```bash
mysql --version
```

O inicie el servicio MySQL desde:
- **Windows**: Servicios de Windows → MySQL
- **macOS**: Preferencias del Sistema → MySQL
- **Linux**: `sudo systemctl status mysql`

### Paso 2: Descargar el Proyecto

#### Opción A: Descargar ZIP
1. Descargue el archivo ZIP del proyecto
2. Extraiga el contenido en una ubicación de su preferencia
3. Ejemplo: `C:\Users\TuUsuario\Documents\WhiteStar-master`

#### Opción B: Clonar con Git
```bash
git clone <URL_DEL_REPOSITORIO>
cd WhiteStar-master
```

### Paso 3: Configurar la Base de Datos

#### 3.1 Crear la Base de Datos

Abra MySQL desde la terminal o MySQL Workbench y ejecute:

```sql
CREATE DATABASE whitestar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 3.2 Crear Usuario de Base de Datos (Opcional pero Recomendado)

```sql
CREATE USER 'whitestar_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON whitestar_db.* TO 'whitestar_user'@'localhost';
FLUSH PRIVILEGES;
```

> **Nota de Seguridad**: En producción, utilice contraseñas fuertes y otorgue solo los permisos necesarios.

### Paso 4: Instalar Dependencias del Backend

#### 4.1 Navegar a la Carpeta Backend

```bash
cd backend
```

#### 4.2 Instalar Dependencias

```bash
npm install
```

Este proceso puede tomar varios minutos dependiendo de su conexión a Internet.

#### 4.3 Verificar Instalación

Al finalizar, debe ver una carpeta `node_modules` con todas las dependencias instaladas.

### Paso 5: Instalar Dependencias del Frontend

#### 5.1 Navegar a la Carpeta Frontend

```bash
cd ../frontend
```

#### 5.2 Instalar Dependencias

```bash
npm install
```

### Paso 6: Configuración de Variables de Entorno

#### 6.1 Configurar Backend

En la carpeta `backend`, ya existe un archivo `.env`. Edítelo con un editor de texto:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=whitestar_db

# Configuración de Seguridad
JWT_SECRET=tu_super_secret_jwt_key_change_me_in_production_12345
JWT_EXPIRATION=24h

# Configuración del Servidor
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=info

# Configuración SMTP (Opcional - para envío de emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password-aqui
```

**Parámetros Importantes a Modificar:**

- `DB_USER`: Usuario de MySQL (por defecto `root`)
- `DB_PASS`: Contraseña de MySQL
- `DB_NAME`: Nombre de la base de datos creada
- `JWT_SECRET`: **IMPORTANTE** - Cambie esto por una cadena aleatoria segura en producción
- `SMTP_*`: Configure si desea funcionalidad de envío de emails

#### 6.2 Configurar Frontend

En la carpeta `frontend`, el archivo `.env` ya está configurado:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=WhiteStar
VITE_APP_VERSION=1.0.0
```

> **Nota**: Solo modifique `VITE_API_BASE_URL` si cambió el puerto del backend.

### Paso 7: Migrar la Base de Datos

Desde la carpeta `backend`, ejecute:

```bash
npm run migrate
```

Este comando:
- Crea todas las tablas necesarias
- Establece relaciones entre tablas
- Configura índices y restricciones

**Salida Esperada:**
```
Conexión a la base de datos establecida
Sincronizando modelos...
Migración completada exitosamente!
```

### Paso 8: Poblar la Base de Datos (Seed)

#### 8.1 Crear Datos de Prueba

```bash
npm run seed
```

Este comando crea:
- Productos de ejemplo
- Categorías
- Métodos de pago
- Datos iniciales del sistema

#### 8.2 Crear Usuario Administrador

```bash
npm run create-admin
```

Siga las instrucciones en pantalla para crear su usuario administrador:
- Ingrese nombre de usuario
- Ingrese email
- Ingrese contraseña (mínimo 8 caracteres)

#### 8.3 Crear Usuarios de Prueba (Opcional)

```bash
npm run seed-users
```

Esto crea usuarios de prueba con diferentes roles. Consulte `SEED_USERS_README.md` para ver las credenciales.

---

## Configuración Post-Instalación

### Configurar Permisos de Archivos

#### Windows
No requiere configuración adicional.

#### macOS/Linux

Asegúrese de que la carpeta `uploads` tenga permisos de escritura:

```bash
cd backend
chmod -R 755 uploads
```

### Configurar CORS (Seguridad)

Si el frontend se ejecutará en un dominio diferente, edite `backend/src/app.js` y ajuste la configuración de CORS:

```javascript
const corsOptions = {
  origin: 'http://tu-dominio.com',
  credentials: true
};
```

### Configurar Variables de Producción

Para un entorno de producción, modifique:

1. **Backend `.env`**:
   ```env
   NODE_ENV=production
   JWT_SECRET=<generar_clave_segura_aleatoria>
   FRONTEND_URL=https://tu-dominio.com
   ```

2. **Frontend `.env`**:
   ```env
   VITE_API_BASE_URL=https://api.tu-dominio.com/api
   ```

### Configurar Email (Opcional)

Para habilitar notificaciones por email:

1. Si usa Gmail:
   - Active la verificación en 2 pasos
   - Genere una "Contraseña de Aplicación"
   - Use esa contraseña en `SMTP_PASS`

2. Configure en `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=tu-email@gmail.com
   SMTP_PASS=tu-app-password-generada
   ```

---

## Verificación de la Instalación

### Paso 1: Iniciar el Backend

Desde la carpeta `backend`:

```bash
npm run dev
```

**Salida Esperada:**
```
Base de datos conectada
Sincronizando modelos...
Modelos sincronizados (alter mode)
Servidor ejecutándose en http://localhost:3001
```

### Paso 2: Verificar API del Backend

Abra un navegador y visite:
```
http://localhost:3001/api/health
```

Debe ver una respuesta JSON indicando que el servidor está funcionando.

### Paso 3: Iniciar el Frontend

Abra una **nueva terminal**, navegue a la carpeta `frontend`:

```bash
cd frontend
npm run dev
```

**Salida Esperada:**
```
VITE v5.x.x  ready in xxx ms

Local:   http://localhost:5173/
Network: use --host to expose
```

### Paso 4: Verificar la Aplicación Web

1. Abra un navegador
2. Visite: `http://localhost:5173`
3. Debe ver la página principal de WhiteStar

### Paso 5: Verificar Login de Administrador

1. Haga clic en "Iniciar Sesión" o "Login"
2. Ingrese las credenciales del administrador creado
3. Debe poder acceder al panel de administración

### Paso 6: Pruebas Funcionales Básicas

Verifique las siguientes funcionalidades:

- **Navegación**: Puede navegar entre páginas
- **Catálogo**: Se muestran productos
- **Búsqueda**: Puede buscar productos
- **Carrito**: Puede agregar productos al carrito
- **Login**: Puede iniciar sesión
- **Admin**: Puede acceder al panel de administración (como admin)

### Paso 7: Verificar Base de Datos

Conecte a MySQL y verifique que las tablas existan:

```sql
USE whitestar_db;
SHOW TABLES;
```

Debe ver tablas como: `users`, `products`, `orders`, `categories`, etc.

### Paso 8: Pruebas de API (Opcional)

Use Postman o Thunder Client para probar endpoints:

**Ejemplo - Obtener Productos:**
```
GET http://localhost:3001/api/products
```

**Ejemplo - Login:**
```
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "admin@whitestar.com",
  "password": "tu_password"
}
```

---

## Desinstalación

### Desinstalación Completa

#### Paso 1: Detener Servicios

1. Detenga el servidor backend (Ctrl+C en la terminal)
2. Detenga el servidor frontend (Ctrl+C en la terminal)

#### Paso 2: Eliminar Base de Datos

Conéctese a MySQL y ejecute:

```sql
DROP DATABASE whitestar_db;
DROP USER 'whitestar_user'@'localhost'; -- Si creó un usuario específico
```

#### Paso 3: Eliminar Archivos del Proyecto

**Windows**:
```bash
cd ..
rmdir /s /q WhiteStar-master
```

**macOS/Linux**:
```bash
cd ..
rm -rf WhiteStar-master
```

### Desinstalación Parcial (Mantener Código)

Si solo desea limpiar datos:

```bash
# Desde la carpeta backend
npm run migrate  # Recrear tablas vacías
```

O elimine solo los datos:

```sql
-- Eliminar datos pero mantener estructura
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
-- Repita para otras tablas según necesite
```

---

## Solución de Problemas de Instalación

### Problema 1: "node: command not found"

**Causa**: Node.js no está instalado o no está en el PATH.

**Solución**:
1. Instale Node.js desde https://nodejs.org/
2. Reinicie la terminal
3. Verifique con `node --version`

### Problema 2: "npm install" falla con errores de permisos

**Causa**: Permisos insuficientes.

**Solución Windows**:
- Ejecute la terminal como Administrador

**Solución macOS/Linux**:
```bash
sudo npm install
```

O configure npm para no requerir sudo:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Problema 3: Error "ECONNREFUSED" al conectar a MySQL

**Causa**: MySQL no está ejecutándose o configuración incorrecta.

**Solución**:
1. Verifique que MySQL esté ejecutándose:
   - Windows: Servicios → MySQL → Iniciar
   - macOS: Preferencias del Sistema → MySQL → Start
   - Linux: `sudo systemctl start mysql`

2. Verifique credenciales en `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=tu_password_real
   ```

3. Pruebe la conexión:
   ```bash
   mysql -u root -p
   ```

### Problema 4: Puerto 3001 o 5173 ya en uso

**Causa**: Otro proceso está usando el puerto.

**Solución**:

**Opción A - Cambiar Puerto**:

Backend (`backend/.env`):
```env
PORT=3002
```

Frontend (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3002/api
```

**Opción B - Liberar Puerto**:

Windows:
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

macOS/Linux:
```bash
lsof -i :3001
kill -9 <PID>
```

### Problema 5: Error "Cannot find module"

**Causa**: Dependencias no instaladas correctamente.

**Solución**:
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema 6: Página en blanco en el frontend

**Causa**: Backend no está ejecutándose o URL incorrecta.

**Solución**:
1. Verifique que el backend esté ejecutándose en `http://localhost:3001`
2. Verifique `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```
3. Abra la consola del navegador (F12) para ver errores

### Problema 7: Error de CORS

**Causa**: Configuración de CORS incorrecta.

**Solución**:

Verifique `backend/.env`:
```env
FRONTEND_URL=http://localhost:5173
```

Si el problema persiste, edite `backend/src/app.js` y verifique la configuración de CORS.

### Problema 8: "JWT malformed" o errores de autenticación

**Causa**: Token JWT inválido o secreto incorrecto.

**Solución**:
1. Limpie las cookies del navegador
2. Cierre sesión y vuelva a iniciar sesión
3. Verifique que `JWT_SECRET` en `.env` sea consistente

### Problema 9: Errores de migración de base de datos

**Causa**: Base de datos en estado inconsistente.

**Solución**:
```sql
-- Eliminar y recrear la base de datos
DROP DATABASE whitestar_db;
CREATE DATABASE whitestar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Luego ejecute nuevamente:
```bash
npm run migrate
npm run seed
npm run create-admin
```

### Problema 10: Imágenes no se cargan

**Causa**: Carpeta uploads sin permisos o ruta incorrecta.

**Solución**:

macOS/Linux:
```bash
cd backend
chmod -R 755 uploads
```

Windows:
- Verifique que la carpeta `backend/uploads` exista
- Cree la carpeta si no existe

---

## Preguntas Frecuentes de Instalación

### ¿Puedo usar otra base de datos en lugar de MySQL?

Sí, WhiteStar usa Sequelize ORM que soporta PostgreSQL, SQLite, MariaDB y MSSQL. Debe:
1. Instalar el driver correspondiente (`npm install pg` para PostgreSQL)
2. Modificar la configuración en `backend/src/config/database.js`
3. Ajustar las variables de entorno en `.env`

### ¿Necesito instalar las dependencias cada vez que descargo el proyecto?

Sí, la carpeta `node_modules` no se incluye en el repositorio por su tamaño. Debe ejecutar `npm install` en backend y frontend la primera vez y cada vez que se actualicen las dependencias.

### ¿Puedo ejecutar el backend y frontend en servidores diferentes?

Sí, solo asegúrese de:
1. Configurar `FRONTEND_URL` en el backend `.env`
2. Configurar `VITE_API_BASE_URL` en el frontend `.env`
3. Ajustar la configuración de CORS si es necesario

### ¿Cómo actualizo el proyecto a una nueva versión?

```bash
# Hacer backup de la base de datos primero
git pull origin main  # Si usa Git
cd backend
npm install  # Actualizar dependencias
cd ../frontend
npm install  # Actualizar dependencias
# Ejecutar migraciones si hay cambios en la BD
cd ../backend
npm run migrate
```

### ¿Qué hago si olvidé la contraseña del administrador?

Puede crear un nuevo administrador:
```bash
cd backend
npm run create-admin
```

O resetear la contraseña directamente en la base de datos usando bcrypt.

### ¿Puedo usar WhiteStar en producción?

Sí, pero debe:
1. Cambiar `NODE_ENV=production` en `.env`
2. Usar un `JWT_SECRET` seguro y aleatorio
3. Configurar HTTPS
4. Usar un servidor de producción (PM2, Docker, etc.)
5. Configurar un servidor web reverso (Nginx, Apache)
6. Implementar backups regulares de la base de datos

### ¿Cómo habilito HTTPS?

Para desarrollo local, puede usar herramientas como `mkcert`. Para producción:
1. Obtenga un certificado SSL (Let's Encrypt es gratuito)
2. Configure Nginx o Apache como proxy reverso
3. Configure los certificados en el servidor web

### ¿Puedo cambiar el puerto del backend o frontend?

Sí:
- **Backend**: Modifique `PORT` en `backend/.env`
- **Frontend**: Vite usa el puerto 5173 por defecto. Para cambiarlo, edite `vite.config.js`:
  ```javascript
  export default defineConfig({
    server: {
      port: 3000
    }
  })
  ```

### ¿Necesito conocimientos de programación para instalar WhiteStar?

No necesariamente, pero debe estar familiarizado con:
- Uso básico de la terminal/línea de comandos
- Instalación de software
- Conceptos básicos de bases de datos

### ¿Dónde puedo obtener ayuda adicional?

- Revise la documentación en la carpeta `docs/` (si existe)
- Consulte los archivos README específicos (ej: `SEED_USERS_README.md`)
- Revise los logs de error en la consola
- Contacte al equipo de desarrollo

---

## Glosario

### API (Application Programming Interface)
Interfaz de Programación de Aplicaciones. Conjunto de reglas y protocolos que permiten que diferentes aplicaciones se comuniquen entre sí.

### Backend
La parte del servidor de la aplicación que maneja la lógica de negocio, base de datos y autenticación. En WhiteStar, es la aplicación Node.js/Express.

### CORS (Cross-Origin Resource Sharing)
Mecanismo de seguridad que permite o restringe recursos solicitados en una aplicación web desde un dominio diferente al que sirvió el recurso.

### Database (Base de Datos)
Sistema organizado para almacenar, gestionar y recuperar información. WhiteStar usa MySQL.

### Dependency (Dependencia)
Paquete o biblioteca externa que el proyecto necesita para funcionar correctamente.

### Environment Variables (Variables de Entorno)
Valores de configuración almacenados fuera del código, generalmente en archivos `.env`, que pueden cambiar según el entorno (desarrollo, producción).

### Frontend
La parte de la aplicación que se ejecuta en el navegador del usuario. En WhiteStar, es la aplicación React/Vite.

### JWT (JSON Web Token)
Estándar abierto para crear tokens de acceso que permiten la autenticación segura entre dos partes.

### Migration (Migración)
Proceso de crear o modificar la estructura de la base de datos (tablas, columnas, índices).

### Node.js
Entorno de ejecución de JavaScript del lado del servidor que permite ejecutar código JavaScript fuera del navegador.

### npm (Node Package Manager)
Gestor de paquetes para Node.js que facilita la instalación y gestión de dependencias.

### ORM (Object-Relational Mapping)
Técnica que permite interactuar con la base de datos usando objetos en lugar de SQL. WhiteStar usa Sequelize.

### Port (Puerto)
Número que identifica un punto de comunicación específico en una red. WhiteStar usa el puerto 3001 para el backend y 5173 para el frontend.

### REST API
Arquitectura de API que usa métodos HTTP (GET, POST, PUT, DELETE) para realizar operaciones.

### Seed (Sembrar)
Proceso de poblar la base de datos con datos iniciales o de prueba.

### Sequelize
ORM para Node.js que soporta múltiples bases de datos SQL.

### SMTP (Simple Mail Transfer Protocol)
Protocolo estándar para envío de correos electrónicos.

### SPA (Single Page Application)
Aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido sin recargar la página completa.

### TRL (Technology Readiness Level)
Escala de 1-9 que mide la madurez de una tecnología. TRL-5 indica que la tecnología ha sido validada en un entorno relevante.

### Vite
Herramienta de construcción moderna para aplicaciones web que proporciona un servidor de desarrollo rápido.

### Workbench
Herramienta gráfica para gestionar bases de datos MySQL.

---

## Información de Contacto y Soporte

**Versión del Manual**: 1.0.0  
**Fecha de Última Actualización**: Diciembre 2025  
**Versión del Software**: 1.0.0  

**Equipo de Desarrollo**: Full-Stack Team  
**Licencia**: MIT  

---

## Notas Finales

- Mantenga siempre copias de seguridad de su base de datos antes de realizar actualizaciones
- Revise los logs regularmente para detectar problemas temprano
- En producción, implemente monitoreo y alertas
- Mantenga las dependencias actualizadas para seguridad
- Documente cualquier configuración personalizada que realice

