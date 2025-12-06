import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

export const securityMiddleware = (app) => {

  // 1. HELMET con CSP estricto para APIs
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],  // SIN unsafe-eval ni unsafe-inline
        styleSrc: ["'self'"],   // SIN unsafe-inline
        imgSrc: ["'self'", "data:", "https:", "http://localhost:3001"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "data:", "https:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        frameAncestors: ["'none'"],  // Anti-Clickjacking
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: []
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: {
      action: 'deny'  // X-Frame-Options: DENY
    },
    noSniff: true,  // X-Content-Type-Options: nosniff
    xssFilter: true
  }));

  // 2. CORS estricto
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
  }));

  // 3. Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2000, // Aumentado para evitar bloqueos durante desarrollo/pruebas
    message: 'Demasiadas peticiones',
    standardHeaders: true
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, // Aumentado para facilitar pruebas
    skipSuccessfulRequests: true
  });

  app.use('/api/', limiter);
  app.use('/api/auth/login', authLimiter);
  app.use('/api/users/register', authLimiter);

  // 4. Ocultar tecnología
  app.disable('x-powered-by');
};
