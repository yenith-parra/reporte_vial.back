const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();

app.use(express.json()); // Parseo de JSON
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reportes', reporteRoutes);

module.exports = app;
