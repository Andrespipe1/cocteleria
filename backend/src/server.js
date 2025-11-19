import express from 'express';
import cors from 'cors';
import multer from 'multer';
import coctelesRouter from './routes/cocteles.js';

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de Multer para subir imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(upload.any());

// Logger simple
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.use('/api/cocteles', coctelesRouter);

app.get('/', (req, res) => {
  res.send('API de Cocteles funcionando');
});

// Manejador 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado - 404' });
});

export default app;
