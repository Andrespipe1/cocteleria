import app from './server.js';
import dotenv from 'dotenv';

dotenv.config();

// Use 4000 by default to avoid conflicting with Next.js (3000)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
