# Pasos para Desplegar WhiteStar - LISTO PARA PRODUCCIÓN ✅

## ✅ Preparación Completada

Tu proyecto WhiteStar está **100% listo** para desplegar en producción. Todos los archivos de configuración han sido creados y optimizados.

---

## 📋 PASOS A SEGUIR

### PASO 1: Subir a GitHub (5 minutos)

```bash
# 1. Asegúrate de estar en la carpeta del proyecto
cd c:\Users\dpast\Documents\WhiteStar-master

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Proyecto listo para producción - Vercel + Railway"

# 4. Subir a GitHub (tu rama es master, no hay problema)
git push origin master
```

**NOTA**: Railway y Vercel funcionan perfectamente con la rama `master`. Solo tendrás que seleccionarla al configurar.

---

### PASO 2: Desplegar Backend en Railway (10 minutos)

#### 2.1 Crear Proyecto

1. Ve a https://railway.app
2. Clic en "Start a New Project"
3. Inicia sesión con GitHub
4. Clic en "Deploy from GitHub repo"
5. Selecciona tu repositorio `WhiteStar-master`
6. **IMPORTANTE**: Selecciona la rama `master`

#### 2.2 Configurar Backend

1. Railway detectará automáticamente Node.js
2. Ve a **Settings** del servicio:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
3. Guarda los cambios

#### 2.3 Agregar MySQL

1. En el proyecto, clic en **"+ New"**
2. Selecciona **"Database"** → **"MySQL"**
3. Espera 1-2 minutos a que se cree

#### 2.4 Configurar Variables de Entorno

1. Ve al servicio **Backend** → **"Variables"**
2. Clic en **"+ New Variable"** y agrega estas variables:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tu-app.vercel.app
LOG_LEVEL=info
```

3. Para **JWT_SECRET**, genera uno seguro:
   - Abre una terminal y ejecuta:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   - Copia el resultado y agrégalo como:
   ```env
   JWT_SECRET=<el-resultado-que-copiaste>
   JWT_EXPIRATION=24h
   ```

4. Para conectar con MySQL, agrega (usando referencias de Railway):
```env
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASS=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
```

5. El backend se desplegará automáticamente

#### 2.5 Obtener URL del Backend

1. Ve al servicio Backend → **"Settings"**
2. En **"Domains"**, clic en **"Generate Domain"**
3. Railway generará una URL como: `https://whitestar-backend-production.up.railway.app`
4. **COPIA ESTA URL** (la necesitarás para Vercel)

#### 2.6 Migrar Base de Datos (OPCIÓN B - AUTOMÁTICA)

**YA ESTÁ TODO CONFIGURADO**. El script `init-production.js` migrará automáticamente la base de datos cuando inicies el backend.

Pero necesitas poblar datos iniciales:

1. Instala Railway CLI:
```bash
npm install -g @railway/cli
```

2. Inicia sesión:
```bash
railway login
```

3. Conecta al proyecto (en la carpeta del proyecto):
```bash
cd c:\Users\dpast\Documents\WhiteStar-master
railway link
```

4. Ejecuta los scripts de inicialización:
```bash
railway run npm run init-prod
railway run npm run seed
railway run npm run create-admin
```

5. Cuando ejecutes `create-admin`, te pedirá:
   - Nombre de usuario
   - Email
   - Contraseña
   
   **GUARDA ESTAS CREDENCIALES** - las necesitarás para acceder al panel de administración.

---

### PASO 3: Desplegar Frontend en Vercel (5 minutos)

#### 3.1 Crear Proyecto

1. Ve a https://vercel.com
2. Clic en **"Add New..."** → **"Project"**
3. Inicia sesión con GitHub
4. Selecciona tu repositorio `WhiteStar-master`
5. **IMPORTANTE**: Selecciona la rama `master`

#### 3.2 Configurar Proyecto

En la pantalla de configuración:

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 3.3 Variables de Entorno

Clic en **"Environment Variables"** y agrega:

```env
VITE_API_BASE_URL=https://tu-backend.railway.app/api
VITE_APP_NAME=WhiteStar
VITE_APP_VERSION=1.0.0
```

**IMPORTANTE**: Reemplaza `tu-backend.railway.app` con la URL real que copiaste de Railway en el Paso 2.5

#### 3.4 Desplegar

1. Clic en **"Deploy"**
2. Espera 2-3 minutos
3. Vercel te dará una URL como: `https://whitestar.vercel.app`
4. **COPIA ESTA URL**

---

### PASO 4: Actualizar FRONTEND_URL en Railway (2 minutos)

1. Vuelve a Railway
2. Ve al servicio **Backend** → **"Variables"**
3. Busca la variable `FRONTEND_URL`
4. Actualízala con la URL de Vercel:
```env
FRONTEND_URL=https://tu-app.vercel.app
```
5. El backend se reiniciará automáticamente

---

### PASO 5: Verificar que Todo Funciona (5 minutos)

#### 5.1 Verificar Backend

Abre en tu navegador:
```
https://tu-backend.railway.app/health
```

Deberías ver:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": ...
}
```

#### 5.2 Verificar Frontend

1. Abre: `https://tu-app.vercel.app`
2. Deberías ver la página principal de WhiteStar
3. Navega al catálogo
4. Intenta iniciar sesión con las credenciales de admin que creaste

#### 5.3 Checklist Final

- [ ] Backend responde en `/health`
- [ ] Frontend carga correctamente
- [ ] Login funciona
- [ ] Catálogo muestra productos
- [ ] No hay errores en consola del navegador (F12)

---

## 🎉 ¡LISTO!

Tu aplicación WhiteStar está en producción en:

- **Frontend**: https://tu-app.vercel.app
- **Backend**: https://tu-backend.railway.app
- **API**: https://tu-backend.railway.app/api

---

## 📊 Costos Mensuales

- **Vercel**: $19.700 CLP/mes (100GB bandwidth)
- **Railway**: $5.000 CLP/mes (backend + MySQL)
- **TOTAL**: ~$24.700 CLP/mes

---

## 🔧 Actualizaciones Futuras

Cuando hagas cambios en el código:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin master
```

- **Vercel** se redespliegue automáticamente en ~2 minutos
- **Railway** se redespliegue automáticamente en ~3 minutos

---

## 🆘 Si Algo Sale Mal

### Error de CORS
- Verifica que `FRONTEND_URL` en Railway coincida exactamente con tu URL de Vercel
- No incluyas `/` al final

### Backend no conecta a MySQL
- Verifica que las variables `DB_*` usen las referencias: `${{MySQL.MYSQLHOST}}`
- Asegúrate de que el servicio MySQL esté activo

### Frontend muestra página en blanco
- Verifica que `VITE_API_BASE_URL` termine en `/api`
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de que el backend esté respondiendo

---

## 📞 Recursos de Ayuda

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Railway Discord**: https://discord.gg/railway

---

**¡Éxito con tu despliegue!** 🚀
