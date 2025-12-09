// Permitir múltiples orígenes para flexibilidad en despliegues
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://whitesstar.vercel.app',
  'https://whitestar-six.vercel.app',
  'https://white-starsas.vercel.app',
  'https://white-starrrr.vercel.app', // URL actual de producción
  process.env.FRONTEND_URL
].filter(Boolean); // Eliminar valores undefined

export const corsConfig = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman, curl, etc.)
    if (!origin) return callback(null, true);

    // Verificar si el origin está en la lista permitida
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};