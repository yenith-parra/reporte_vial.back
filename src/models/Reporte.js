const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo_problema: { type: String, required: true },
  descripcion: { type: String },
  ubicacion: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  imagenes: { type: [String] },
  estado: { type: String, enum: ['pendiente', 'en proceso', 'resuelto'], default: 'pendiente' },
  fecha_reporte: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reporte', reporteSchema);
