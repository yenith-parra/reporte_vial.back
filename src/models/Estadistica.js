const mongoose = require('mongoose');

const estadisticaSchema = new mongoose.Schema({
  tipo_problema: { type: String, required: true },
  frecuencia: { type: Number, required: true },
  zonas_afectadas: [
    {
      ubicacion: { lat: Number, long: Number },
      frecuencia: Number,
    },
  ],
  ultima_actualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Estadistica', estadisticaSchema);
