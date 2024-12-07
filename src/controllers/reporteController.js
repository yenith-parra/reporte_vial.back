const jwt = require('jsonwebtoken');
const Reporte = require('../models/Reporte');

exports.crearReporte = async (req, res) => {
  try {
    // Decodifica el token para obtener el usuario_id
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario_id = decoded.id;

    const { tipo_problema, descripcion, ubicacion, imagenes } = req.body;
    console.log("Datos recibidos:", req.body);
    console.log("Token decodificado:", decoded);


    const nuevoReporte = new Reporte({
      usuario_id, // Se asigna desde el token
      tipo_problema,
      descripcion,
      ubicacion,
      imagenes,
      estado: 'pendiente', // Estado inicial del reporte
    });

    await nuevoReporte.save();
    res.status(201).json({ mensaje: 'Reporte creado exitosamente', reporte: nuevoReporte });
  } catch (error) {
    console.error("Error al crear el reporte:", error);
    res.status(500).json({ error: 'Error al crear el reporte' });
  }
};


// Consultar todos los reportes
exports.obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().populate('usuario_id', 'nombre email');
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
};

// Consultar un reporte específico
exports.obtenerReportePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findById(id).populate('usuario_id', 'nombre email');

    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
};

// Actualizar el estado de un reporte
exports.actualizarEstadoReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const reporteActualizado = await Reporte.findByIdAndUpdate(id, { estado }, { new: true });

    if (!reporteActualizado) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.status(200).json({ mensaje: 'Estado del reporte actualizado', reporte: reporteActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del reporte' });
  }
};
