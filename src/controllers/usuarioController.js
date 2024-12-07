const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, tipo_usuario } = req.body;
    console.log("El body de la petición es: ", req.body);
    // Validación de datos
    if (!nombre || !email || !contraseña || !tipo_usuario) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: hashedPassword,
      tipo_usuario,
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.log('Error detallado:', error); // Más detalles del error en la consola
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Verificar la contraseña
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario._id, tipo_usuario: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar la respuesta con los datos del usuario
    res.status(200).json({
      token,
      usuario_id: usuario._id,
      tipo_usuario: usuario.tipo_usuario,
      nombre: usuario.nombre, // Asegúrate de incluir el nombre
    });

    console.log("Inicio de sesión exitoso:", {
      token,
      usuario_id: usuario._id,
      tipo_usuario: usuario.tipo_usuario,
      nombre: usuario.nombre,
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

