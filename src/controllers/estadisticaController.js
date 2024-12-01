const Reporte = require('../models/Reporte');

exports.obtenerEstadisticasGenerales = async (req, res) => {
  try {
    // Estadísticas por tipo de problema
    const problemas = await Reporte.aggregate([
      { $group: { _id: "$tipo_problema", cantidad: { $sum: 1 } } },
    ]);

    // Estados de los reportes
    const estados = await Reporte.aggregate([
      { $group: { _id: "$estado", cantidad: { $sum: 1 } } },
    ]);

    // Zonas más reportadas
    const zonas = await Reporte.aggregate([
      { $group: { _id: "$ubicacion", frecuencia: { $sum: 1 } } },
      { $sort: { frecuencia: -1 } }, // Ordenar por mayor frecuencia
      { $limit: 5 }, // Top 5 zonas más reportadas
    ]);

    res.status(200).json({
      problemas,
      estados,
      zonas,
    });
    
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};
