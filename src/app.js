const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const usuarioRoutes = require('./routes/usuarioRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const estadisticaRoutes = require('./routes/estadisticaRoutes');    

const app = express();

// Configuración de CORS
app.options('*', cors());

app.use(cors({
    origin: '*', // Permite solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(express.json()); // Parseo de JSON
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/estadisticas', estadisticaRoutes);

module.exports = app;
