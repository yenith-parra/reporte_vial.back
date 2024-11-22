const express = require('express');
const {
  crearReporte,
  obtenerReportes,
  obtenerReportePorId,
  actualizarEstadoReporte,
} = require('../controllers/reporteController');

const router = express.Router();

// Crear un reporte
router.post('/', crearReporte);

// Obtener todos los reportes
router.get('/', obtenerReportes);

// Obtener un reporte específico por ID
router.get('/:id', obtenerReportePorId);

// Actualizar el estado de un reporte
router.patch('/:id', actualizarEstadoReporte);

module.exports = router;
