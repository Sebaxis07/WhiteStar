# WhiteStar - Sistema Web de Gestion de Ventas

## Introduccion

WhiteStar es un sistema web completo para la gestion de ventas de una tienda online. Permite administrar productos, manejar un carrito de compras, procesar ventas y gestionar usuarios con diferentes niveles de acceso. El sistema esta pensado para pequeñas y medianas empresas que necesitan una solucion sencilla pero funcional para vender sus productos por internet.

El proyecto se divide en dos partes: un backend que maneja toda la logica del negocio y la base de datos, y un frontend que es la interfaz que ven los usuarios. Ambas partes trabajan juntas para ofrecer una experiencia completa.

---

## Requisitos del Sistema

### Hardware minimo
- Procesador: Intel Core i3 o equivalente
- Memoria RAM: 4 GB
- Espacio en disco: 1 GB disponible
- Conexion a internet estable

### Software necesario
- Sistema operativo: Windows 10/11, macOS o Linux
- Node.js version 20.0.0 o superior
- npm (incluido con Node.js)
- MySQL Server 8.0 o superior (puede ser local o en la nube)
- Un navegador web actualizado (Chrome, Firefox, Edge)
- Git (opcional, para clonar el repositorio)

---

## Proceso de Instalacion

### Paso 1: Descargar el proyecto

Si tienes Git instalado, abre una terminal y ejecuta:

```
git clone https://github.com/Sebaxis07/WhiteStar.git
cd WhiteStar
```

Si no tienes Git, descarga el archivo ZIP desde la pagina del repositorio y extrae su contenido en una carpeta de tu eleccion.

### Paso 2: Instalar dependencias del backend

Abre una terminal, navega a la carpeta del backend y ejecuta:

```
cd backend
npm install
```

Este proceso descargara todas las librerias necesarias. Puede tomar varios minutos dependiendo de tu conexion.

### Paso 3: Instalar dependencias del frontend

Abre otra terminal (o usa la misma), navega a la carpeta del frontend y ejecuta:

```
cd frontend
npm install
```

### Paso 4: Configurar la base de datos MySQL

Antes de continuar, necesitas tener MySQL instalado y corriendo. Crea una base de datos nueva con el nombre que prefieras. Por ejemplo, usando la linea de comandos de MySQL:

```
mysql -u root -p
CREATE DATABASE whitestar_db;
EXIT;
```

### Paso 5: Crear los archivos de configuracion

En la carpeta del backend, crea un archivo llamado `.env` con el siguiente contenido (ajusta los valores segun tu configuracion):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASS=tu_contraseña_mysql
DB_NAME=whitestar_db
JWT_SECRET=una_clave_secreta_larga_y_segura
PORT=3001
NODE_ENV=development
```

En la carpeta del frontend, crea un archivo `.env` con:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=WhiteStar
VITE_APP_VERSION=1.0.0
```

### Paso 6: Ejecutar las migraciones

Desde la carpeta del backend, ejecuta:

```
npm run migrate
```

Esto creara todas las tablas necesarias en la base de datos.

### Paso 7: Poblar la base de datos con datos iniciales

Para tener datos de prueba, ejecuta:

```
npm run seed
```

Este comando creara productos de ejemplo y usuarios de prueba.

---

## Configuracion

### Configurar el servidor de correo (opcional)

Si deseas que el sistema envie correos electronicos, agrega estas variables al archivo `.env` del backend:

```
MAIL_HOST=smtp.tuservidor.com
MAIL_PORT=587
MAIL_USER=tu_correo@ejemplo.com
MAIL_PASS=tu_contraseña_correo
```

### Configurar permisos de usuario

El sistema viene con dos roles predefinidos:
- Administrador (role_id 1): Acceso completo al panel de administracion, gestion de productos, usuarios y reportes.
- Vendedor (role_id 2): Acceso limitado para procesar ventas y ver el catalogo.

Para crear un usuario administrador, ejecuta:

```
npm run create-admin
```

### Configurar el puerto del servidor

Por defecto, el backend corre en el puerto 3001. Si necesitas cambiarlo, modifica la variable `PORT` en el archivo `.env` del backend.

El frontend por defecto corre en el puerto 5173 (Vite). Ambos puertos deben estar disponibles para que el sistema funcione.

---

## Verificacion de la Instalacion

### Iniciar el backend

Desde la carpeta del backend, ejecuta:

```
npm start
```

Deberias ver un mensaje indicando que el servidor esta corriendo en el puerto configurado.

### Iniciar el frontend

Desde la carpeta del frontend, ejecuta:

```
npm run dev
```

Abre tu navegador y ve a `http://localhost:5173`. Deberias ver la pagina principal de WhiteStar.

### Probar el inicio de sesion

Si ejecutaste el seed, puedes iniciar sesion con los usuarios de prueba. Verifica que puedas navegar por el catalogo y agregar productos al carrito.

### Verificar conexion a la base de datos

Si el backend inicia sin errores y puedes ver productos en el catalogo, significa que la conexion a la base de datos funciona correctamente.

---

## Desinstalacion

### Paso 1: Detener los servidores

Si los servidores estan corriendo, detenlos presionando `Ctrl + C` en cada terminal.

### Paso 2: Eliminar la base de datos

Usando la linea de comandos de MySQL:

```
mysql -u root -p
DROP DATABASE whitestar_db;
EXIT;
```

### Paso 3: Eliminar los archivos del proyecto

Simplemente borra la carpeta donde clonaste o extrajiste el proyecto.

### Paso 4: Limpiar dependencias globales (opcional)

Si instalaste alguna dependencia de forma global y ya no la necesitas, puedes desinstalarla con:

```
npm uninstall -g nombre_del_paquete
```

---

## Solucion de Problemas de Instalacion

### El backend no conecta a la base de datos

- Verifica que MySQL este corriendo.
- Revisa que el nombre de la base de datos, usuario y contraseña en el archivo `.env` sean correctos.
- Asegurate de que el puerto de MySQL (por defecto 3306) no este bloqueado por el firewall.

### Error "npm: command not found"

Node.js no esta instalado o no esta en el PATH del sistema. Descarga Node.js desde nodejs.org e instalalo nuevamente.

### Error "EACCES permission denied"

En Linux o macOS, puede que necesites ejecutar los comandos con permisos de administrador. Evita usar `sudo` con npm; en su lugar, configura npm para usar un directorio diferente para paquetes globales.

### El frontend muestra pagina en blanco

- Abre la consola del navegador (F12) y revisa si hay errores.
- Verifica que la variable `VITE_API_BASE_URL` en el `.env` del frontend apunte correctamente al backend.
- Asegurate de que el backend este corriendo.

### Error "Port already in use"

Otro programa esta usando ese puerto. Cambia el puerto en el archivo `.env` o cierra el programa que lo esta ocupando.

### Las migraciones fallan

- Verifica que la base de datos exista.
- Revisa que el usuario de MySQL tenga permisos para crear tablas.
- Si ya ejecutaste migraciones antes y hay conflictos, puedes intentar borrar todas las tablas y ejecutar las migraciones nuevamente.

---

## Preguntas Frecuentes de Instalacion

### Puedo usar PostgreSQL en lugar de MySQL?

No, el proyecto esta configurado especificamente para MySQL. Usar otra base de datos requeriria modificar la configuracion de Sequelize y posiblemente ajustar algunas consultas.

### Es necesario instalar el frontend y el backend en el mismo servidor?

No. Puedes instalar cada parte en servidores diferentes, siempre y cuando el frontend pueda comunicarse con la URL del backend. Esto es comun en produccion, donde el frontend puede estar en Vercel y el backend en Railway.

### Que version de npm necesito?

npm viene incluido con Node.js. Si tienes Node.js 20 o superior, tu version de npm sera compatible.

### Puedo usar yarn en lugar de npm?

Si, puedes usar yarn. Simplemente reemplaza `npm install` por `yarn install` y `npm run` por `yarn` en los comandos.

### Como actualizo el proyecto cuando hay cambios nuevos?

Si clonaste con Git, ejecuta `git pull` en la carpeta principal. Luego ejecuta `npm install` en las carpetas del backend y frontend para actualizar las dependencias.

### Donde se guardan las imagenes de los productos?

Las imagenes se guardan en la carpeta `backend/uploads`. Esta carpeta se crea automaticamente cuando subes la primera imagen.

---

## Glosario

**API**: Interfaz de programacion que permite que el frontend y el backend se comuniquen entre si.

**Backend**: La parte del sistema que corre en el servidor. Maneja la logica del negocio, las operaciones con la base de datos y la seguridad.

**Base de datos**: Donde se guardan todos los datos del sistema como productos, usuarios y ventas. WhiteStar usa MySQL.

**Dependencias**: Librerias o paquetes externos que el proyecto necesita para funcionar. Se instalan con npm.

**Endpoint**: Una direccion especifica de la API donde se pueden enviar peticiones. Por ejemplo, `/api/productos` es un endpoint para obtener productos.

**Frontend**: La parte del sistema que ven los usuarios en su navegador. Esta construido con React.

**JWT (JSON Web Token)**: Un metodo para manejar la autenticacion de usuarios de forma segura.

**Migracion**: Un script que crea o modifica la estructura de las tablas en la base de datos.

**MySQL**: Sistema de gestion de bases de datos relacional usado por WhiteStar.

**Node.js**: Entorno de ejecucion que permite correr JavaScript fuera del navegador. Es necesario para el backend.

**npm**: Gestor de paquetes de Node.js. Se usa para instalar y manejar las dependencias del proyecto.

**Puerto**: Numero que identifica un servicio en una computadora. El backend usa el puerto 3001 y el frontend el 5173 por defecto.

**React**: Libreria de JavaScript para construir interfaces de usuario. Es la base del frontend.

**Seed**: Datos iniciales que se cargan en la base de datos para pruebas o para que el sistema tenga contenido desde el inicio.

**Sequelize**: Libreria que facilita la interaccion con la base de datos MySQL desde Node.js.

**Vite**: Herramienta de desarrollo que permite ejecutar el frontend de forma rapida durante el desarrollo.

**Variable de entorno**: Valores de configuracion que se guardan fuera del codigo, en archivos `.env`. Permiten cambiar la configuracion sin modificar el codigo.
