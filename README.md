# WhiteStar - Manual de Instalacion

## Introduccion

WhiteStar es un sistema web de gestion de ventas para una tienda de fragancias. Permite administrar productos, manejar un carrito de compras, procesar ventas simuladas y gestionar usuarios con diferentes niveles de acceso.

El proyecto tiene dos partes:
- **Backend**: API REST construida con Node.js, Express y Sequelize, conectada a MySQL
- **Frontend**: Aplicacion SPA construida con React y Vite

---

## Requisitos del Sistema

### Hardware minimo
- Procesador: Intel Core i3 o equivalente
- Memoria RAM: 4 GB
- Espacio en disco: 1 GB disponible
- Conexion a internet

### Software necesario
- Node.js version 20.0.0 o superior
- npm (viene incluido con Node.js)
- MySQL Server 8.0 o superior
- Git (opcional, para clonar el repositorio)
- Un navegador web actualizado

---

## Proceso de Instalacion

### Paso 1: Obtener el codigo

Con Git:
```
git clone https://github.com/Sebaxis07/WhiteStar.git
cd WhiteStar
```

Sin Git: descarga el ZIP desde GitHub y extrae el contenido.

### Paso 2: Crear la base de datos

Abre MySQL y ejecuta:
```sql
CREATE DATABASE whitestar_db;
```

### Paso 3: Configurar el backend

Navega a la carpeta del backend:
```
cd backend
```

Crea un archivo `.env` con el siguiente contenido (ajusta los valores segun tu configuracion):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASS=tu_contraseña_mysql
DB_NAME=whitestar_db
JWT_SECRET=una_clave_secreta_larga_y_segura
JWT_EXPIRATION=24h
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Instala las dependencias:
```
npm install
```

### Paso 4: Ejecutar migraciones y seed

Esto crea las tablas y carga datos iniciales:
```
npm run migrate
npm run seed
```

El seed crea productos de ejemplo y usuarios de prueba con diferentes roles.

### Paso 5: Configurar el frontend

Abre otra terminal y navega a la carpeta del frontend:
```
cd frontend
```

Crea un archivo `.env` con:
```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=WhiteStar
VITE_APP_VERSION=1.0.0
```

Instala las dependencias:
```
npm install
```

---

## Configuracion

### Variables de entorno del backend

| Variable | Descripcion |
|----------|-------------|
| DB_HOST | Host de MySQL (localhost o IP) |
| DB_PORT | Puerto de MySQL (default: 3306) |
| DB_USER | Usuario de MySQL |
| DB_PASS | Contraseña de MySQL |
| DB_NAME | Nombre de la base de datos |
| JWT_SECRET | Clave secreta para firmar tokens JWT |
| JWT_EXPIRATION | Tiempo de expiracion del token (ej: 24h) |
| PORT | Puerto donde corre el backend (default: 3001) |
| NODE_ENV | Entorno (development o production) |
| FRONTEND_URL | URL del frontend para CORS |

### Variables de entorno del frontend

| Variable | Descripcion |
|----------|-------------|
| VITE_API_BASE_URL | URL completa de la API del backend |
| VITE_APP_NAME | Nombre de la aplicacion |
| VITE_APP_VERSION | Version de la aplicacion |

### Crear usuario administrador

Si necesitas crear un administrador manualmente:
```
npm run create-admin
```

---

## Verificacion de la Instalacion

### Iniciar el backend

Desde la carpeta backend:
```
npm start
```

Deberia mostrar un mensaje indicando que el servidor corre en el puerto 3001.

### Iniciar el frontend

Desde la carpeta frontend:
```
npm run dev
```

Abre tu navegador en `http://localhost:5173`. Deberias ver la pagina principal de WhiteStar.

### Verificar funcionamiento

1. Navega al catalogo y verifica que se muestren productos
2. Intenta registrar una cuenta nueva
3. Inicia sesion y agrega un producto al carrito
4. Revisa que el proceso de checkout funcione

Si todo esto funciona, la instalacion esta completa.

---

## Desinstalacion

### Detener los servidores

Presiona `Ctrl + C` en cada terminal donde estan corriendo el backend y frontend.

### Eliminar la base de datos

En MySQL:
```sql
DROP DATABASE whitestar_db;
```

### Eliminar archivos

Borra la carpeta del proyecto.

---

## Solucion de Problemas

### Error de conexion a la base de datos

- Verifica que MySQL este corriendo
- Revisa que las credenciales en el archivo `.env` sean correctas
- Asegurate de que la base de datos exista

### Error "npm: command not found"

Node.js no esta instalado o no esta en el PATH. Descarga e instala Node.js desde nodejs.org

### Puerto en uso

Si el puerto 3001 o 5173 estan ocupados:
- Cambia el puerto en el archivo `.env` correspondiente
- O cierra el programa que esta usando ese puerto

### Las migraciones fallan

- Verifica que la base de datos exista
- Revisa que el usuario MySQL tenga permisos para crear tablas

### El frontend no conecta con el backend

- Verifica que el backend este corriendo
- Revisa que `VITE_API_BASE_URL` en el `.env` del frontend sea correcto
- Comprueba que el puerto coincida

### CORS errors

- Verifica que `FRONTEND_URL` en el backend coincida con la URL donde corre el frontend

---

## Preguntas Frecuentes

### Puedo usar otra base de datos?

No, el proyecto esta configurado para MySQL. Usar otra base de datos requeriria modificar la configuracion de Sequelize.

### Puedo usar yarn en lugar de npm?

Si, reemplaza `npm install` por `yarn` y `npm run` por `yarn`.

### Como actualizo el proyecto?

Con Git:
```
git pull
npm install  # en ambas carpetas
npm run migrate  # en backend si hay cambios en la BD
```

### El seed sobrescribe datos existentes?

Depende de como este configurado. Revisa el archivo `seed.js` para entender su comportamiento.

---

## Glosario

**API**: Interfaz de programacion que permite la comunicacion entre frontend y backend.

**Backend**: Servidor que maneja la logica de negocio y la base de datos.

**Dependencias**: Librerias externas que el proyecto necesita para funcionar.

**Frontend**: Interfaz de usuario que corre en el navegador.

**JWT**: JSON Web Token, metodo para autenticacion de usuarios.

**Migracion**: Script que crea o modifica la estructura de la base de datos.

**MySQL**: Sistema de base de datos relacional usado por WhiteStar.

**Node.js**: Entorno de ejecucion de JavaScript en el servidor.

**npm**: Gestor de paquetes de Node.js.

**Seed**: Datos iniciales que se cargan en la base de datos.

**Sequelize**: ORM que facilita la interaccion con MySQL desde Node.js.

**Vite**: Herramienta de desarrollo para el frontend.

**Variable de entorno**: Valor de configuracion que se guarda fuera del codigo.
