const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const usuarioRoutes = require('./routes/usuarioRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const estadisticaRoutes = require('./routes/estadisticaRoutes');    

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(express.json()); // Parseo de JSON
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/estadisticas', estadisticaRoutes);

module.exports = app;
