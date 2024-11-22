const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['ciudadano', 'administrador'], required: true },
  fecha_registro: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
