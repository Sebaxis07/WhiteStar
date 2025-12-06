# Pasos Exactos para Desplegar Backend en Railway

## PASO 1: Crear Proyecto en Railway

1. Abre tu navegador y ve a: **https://railway.app**
2. Haz clic en **"Start a New Project"**
3. Si no has iniciado sesión, haz clic en **"Login"** y usa GitHub
4. Una vez dentro, haz clic en **"+ New Project"**
5. Selecciona **"Deploy from GitHub repo"**
6. Busca tu repositorio **"WhiteStar"** o **"WhiteStar-master"**
7. Haz clic en el repositorio
8. Railway comenzará a crear el proyecto

---

## PASO 2: Configurar Root Directory

1. Railway detectará automáticamente que es Node.js
2. Verás un servicio creado (puede llamarse "whitestar-master" o similar)
3. Haz clic en ese servicio
4. Haz clic en la pestaña **"Settings"** (icono de engranaje ⚙️)
5. Busca la sección **"Build"**
6. En **"Root Directory"**, escribe: `backend`
7. En **"Start Command"**, escribe: `npm start`
8. Railway guardará automáticamente

---

## PASO 3: Agregar Base de Datos MySQL

1. En la vista del proyecto (dashboard principal), haz clic en **"+ New"**
2. Selecciona **"Database"**
3. Selecciona **"Add MySQL"**
4. Railway creará la base de datos automáticamente
5. Espera 1-2 minutos (verás un spinner girando)
6. Cuando termine, verás un nuevo servicio llamado **"MySQL"**

---

## PASO 4: Configurar Variables de Entorno

### 4.1 Ir a Variables

1. Haz clic en el servicio **Backend** (NO en MySQL)
2. Haz clic en la pestaña **"Variables"**
3. Verás una lista de variables (puede estar vacía)

### 4.2 Agregar Variables Básicas

Haz clic en **"+ New Variable"** y agrega UNA POR UNA:

**Variable 1:**
- Name: `NODE_ENV`
- Value: `production`

**Variable 2:**
- Name: `PORT`
- Value: `3001`

**Variable 3:**
- Name: `LOG_LEVEL`
- Value: `info`

**Variable 4:**
- Name: `JWT_EXPIRATION`
- Value: `24h`

### 4.3 Generar JWT_SECRET

**EN TU COMPUTADORA**, abre una terminal (PowerShell o CMD) y ejecuta:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Te dará algo como:
```
a1b2c3d4e5f6....(un texto muy largo)
```

Copia TODO ese texto.

**EN RAILWAY**, agrega:
- Name: `JWT_SECRET`
- Value: `<pega-el-texto-que-copiaste>`

### 4.4 Conectar con MySQL

Agrega estas variables EXACTAMENTE como están (con los símbolos `${{}}` incluidos):

**Variable 6:**
- Name: `DB_HOST`
- Value: `${{MySQL.MYSQLHOST}}`

**Variable 7:**
- Name: `DB_PORT`
- Value: `${{MySQL.MYSQLPORT}}`

**Variable 8:**
- Name: `DB_USER`
- Value: `${{MySQL.MYSQLUSER}}`

**Variable 9:**
- Name: `DB_PASS`
- Value: `${{MySQL.MYSQLPASSWORD}}`

**Variable 10:**
- Name: `DB_NAME`
- Value: `${{MySQL.MYSQLDATABASE}}`

### 4.5 Agregar FRONTEND_URL (temporal)

**Variable 11:**
- Name: `FRONTEND_URL`
- Value: `http://localhost:5173`

(Esto lo actualizaremos después con la URL real de Vercel)

---

## PASO 5: Esperar el Despliegue

1. Railway desplegará automáticamente después de configurar las variables
2. Haz clic en la pestaña **"Deployments"**
3. Verás el progreso del build
4. Espera a que diga **"Success"** con un check verde ✓
5. Esto toma aproximadamente 2-3 minutos

---

## PASO 6: Generar URL Pública

1. Haz clic en el servicio **Backend**
2. Haz clic en la pestaña **"Settings"**
3. Baja hasta la sección **"Networking"**
4. En **"Public Networking"**, haz clic en el botón **"Generate Domain"** (botón morado con rayo ⚡)
5. Railway generará una URL como:
   ```
   https://whitestar-backend-production.up.railway.app
   ```
6. **COPIA ESTA URL COMPLETA** (la necesitarás en los siguientes pasos)

---

## PASO 7: Actualizar FRONTEND_URL

1. Ve a la pestaña **"Variables"** del servicio Backend
2. Busca la variable `FRONTEND_URL`
3. Haz clic en el icono de lápiz (editar)
4. Cámbiala a tu URL de Vercel:
   ```
   https://tu-app.vercel.app
   ```
   (Reemplaza con tu URL real de Vercel)
5. Haz clic en el check ✓ para guardar
6. El backend se reiniciará automáticamente

---

## PASO 8: Instalar Railway CLI

**EN TU COMPUTADORA**, abre PowerShell o CMD y ejecuta:

```bash
npm install -g @railway/cli
```

Espera a que termine la instalación (toma ~1 minuto).

---

## PASO 9: Iniciar Sesión en Railway CLI

En la misma terminal, ejecuta:

```bash
railway login
```

Se abrirá tu navegador automáticamente. Haz clic en **"Confirm"** o **"Allow"**.

Verás un mensaje en la terminal que dice: "Logged in as tu-email@gmail.com"

---

## PASO 10: Conectar al Proyecto

En la terminal, navega a tu proyecto:

```bash
cd c:\Users\dpast\Documents\WhiteStar-master
```

Luego ejecuta:

```bash
railway link
```

Te mostrará una lista de tus proyectos. Usa las flechas ↑↓ para seleccionar tu proyecto de WhiteStar y presiona Enter.

Verás un mensaje: "Linked to project: whitestar-..."

---

## PASO 11: Migrar la Base de Datos

Ejecuta estos comandos UNO POR UNO:

### 11.1 Inicializar Base de Datos

```bash
railway run npm run init-prod
```

Verás mensajes como:
```
Conectando a la base de datos...
✓ Conexión establecida
Sincronizando modelos...
✓ Base de datos sincronizada
```

### 11.2 Poblar con Datos de Prueba

```bash
railway run npm run seed
```

Verás mensajes sobre la creación de productos, categorías, etc.

### 11.3 Crear Usuario Administrador

```bash
railway run npm run create-admin
```

Te pedirá:
1. **Username**: Escribe un nombre de usuario (ej: `admin`)
2. **Email**: Escribe un email (ej: `admin@whitestar.com`)
3. **Password**: Escribe una contraseña (mínimo 8 caracteres)

**IMPORTANTE: GUARDA ESTAS CREDENCIALES** - las necesitarás para acceder al panel de administración.

---

## PASO 12: Verificar que Funciona

### 12.1 Verificar Health Check

Abre tu navegador y ve a:
```
https://tu-backend.railway.app/health
```
(Reemplaza con tu URL real de Railway)

Deberías ver:
```json
{
  "status": "OK",
  "timestamp": "2025-12-06T...",
  "uptime": 123.45
}
```

### 12.2 Verificar API de Productos

```
https://tu-backend.railway.app/api/products
```

Deberías ver un array JSON con productos.

---

## PASO 13: Actualizar Vercel con la URL del Backend

1. Ve a **Vercel** → Tu proyecto
2. Haz clic en **"Settings"**
3. Haz clic en **"Environment Variables"**
4. Busca `VITE_API_BASE_URL`
5. Haz clic en el icono de lápiz (editar)
6. Cámbiala a:
   ```
   https://tu-backend.railway.app/api
   ```
   (Reemplaza con tu URL real de Railway + `/api` al final)
7. Haz clic en **"Save"**
8. Ve a **"Deployments"**
9. Haz clic en los 3 puntos (...) del último despliegue
10. Selecciona **"Redeploy"**

---

## ✅ VERIFICACIÓN FINAL

Abre tu aplicación en Vercel:
```
https://tu-app.vercel.app
```

1. Deberías ver la página principal de WhiteStar
2. Navega al catálogo - deberías ver productos
3. Intenta iniciar sesión con las credenciales de admin que creaste
4. Deberías poder acceder al panel de administración

---

## 🎉 ¡LISTO!

Tu aplicación WhiteStar está completamente desplegada:

- **Frontend**: https://tu-app.vercel.app
- **Backend**: https://tu-backend.railway.app
- **API**: https://tu-backend.railway.app/api

**Costo mensual**: ~$24.700 CLP
- Vercel: $19.700
- Railway: $5.000

---

## 🆘 Si Algo Sale Mal

### El backend no responde en /health

1. Ve a Railway → Backend → "Deployments"
2. Haz clic en el despliegue activo
3. Revisa los logs - busca errores en rojo
4. Verifica que todas las variables de entorno estén configuradas

### Error "Cannot connect to database"

1. Verifica que el servicio MySQL esté activo (tiene un punto verde)
2. Verifica que las variables `DB_*` usen `${{MySQL.MYSQLHOST}}` etc.
3. Reinicia el servicio Backend

### Frontend no se conecta al backend

1. Verifica que `VITE_API_BASE_URL` en Vercel termine en `/api`
2. Verifica que `FRONTEND_URL` en Railway sea la URL correcta de Vercel
3. Abre la consola del navegador (F12) para ver errores

---

**Sigue estos pasos en orden y todo funcionará.** 🚀
