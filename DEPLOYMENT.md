# Guía Rápida de Despliegue - WhiteStar

## Resumen

Desplegar WhiteStar en **Vercel** (frontend) + **Railway** (backend + MySQL).

**Costo**: ~$24.700 CLP/mes

---

## Pasos Rápidos

### 1. Preparación

```bash
# Subir a GitHub
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

### 2. Railway (Backend + MySQL)

1. Ve a [railway.app](https://railway.app) → "New Project" → "Deploy from GitHub"
2. Selecciona tu repositorio
3. Configura:
   - Root Directory: `backend`
   - Start Command: `npm start`
4. Agrega MySQL: "+ New" → "Database" → "MySQL"
5. Variables de entorno en Backend:
```
NODE_ENV=production
PORT=3001
JWT_SECRET=<genera-secreto-aleatorio>
FRONTEND_URL=https://tu-app.vercel.app
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASS=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
```

6. Inicializar BD:
```bash
npm install -g @railway/cli
railway login
railway link
railway run npm run init-prod
railway run npm run seed
railway run npm run create-admin
```

### 3. Vercel (Frontend)

1. Ve a [vercel.com](https://vercel.com) → "Add New Project"
2. Selecciona tu repositorio
3. Configura:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Variables de entorno:
```
VITE_API_BASE_URL=https://tu-backend.railway.app/api
VITE_APP_NAME=WhiteStar
VITE_APP_VERSION=1.0.0
```

5. Deploy!

### 4. Actualizar FRONTEND_URL

Vuelve a Railway → Backend → Variables → Actualiza:
```
FRONTEND_URL=https://tu-app.vercel.app
```

---

## Verificación

- [ ] Backend: `https://tu-backend.railway.app/health`
- [ ] Frontend: `https://tu-app.vercel.app`
- [ ] Login funciona
- [ ] Productos se muestran

---

## Generar JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

Para más detalles, consulta `guia_despliegue.md`
