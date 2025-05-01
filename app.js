const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors')

// Cargar variables de entorno
config();


// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Importar rutas
const tareaRoutes = require('./src/routes/tarea-route');
const sprintRoutes = require('./src/routes/sprint-route');
const backlogRoutes = require('./src/routes/backlog-route');

// Rutas
app.use('/tareas', tareaRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

// Conectamos la base de datos
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });

  // que onda esto:
  const db = mongoose.connection;

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});


module.exports = app;
