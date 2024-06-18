// server/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const PORT = process.env.PORT || 80;

// Recrear __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para servir archivos estáticos del cliente
// app.use(express.static(path.join(__dirname, '../client')));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
import cors from 'cors';
app.use(cors());

// Rutas de la API
import proyectosRoutes from './routes/proyectosRoutes.js';
import alumnosRoutes from './routes/alumnosRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
app.use('/proyecto', proyectosRoutes);
app.use('/alumno', alumnosRoutes);
app.use('/api', apiRoutes);

// Base de datos
import { dbPromise } from './database/database.js';

// Asegurarse de que la base de datos está inicializada antes de iniciar el servidor
dbPromise.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize the database', err);
  process.exit(1);
});

// Redireccionamos al proyecto cliente si no es una ruta de la API
// app.get('/', (req, res) => {
//   res.redirect('http://localhost:8080');
// });

// Middleware para servir archivos estáticos del cliente
app.use(express.static(path.join(__dirname, './clientdist')));

//TODO: en lugar de usar nodemon, usar la opción node --watch index.js


