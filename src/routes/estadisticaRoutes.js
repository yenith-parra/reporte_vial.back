const express = require('express');
const { obtenerEstadisticasGenerales } = require('../controllers/estadisticaController');

const router = express.Router();

// Ruta para obtener estadísticas generales
router.get('/generales', obtenerEstadisticasGenerales);

module.exports = router;
