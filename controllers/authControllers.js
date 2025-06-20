const supabaseAdmin = require('../supabaseClient');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAnonClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// --- FUNCIÓN DE REGISTRO ---
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validar que se recibieron los datos
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
  }

  try {
    // 2. Usar el cliente de administrador de Supabase para crear el usuario
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirma el email para simplificar
    });

    // 3. Manejar un posible error de Supabase
    if (error) {
      // Si Supabase devuelve un error (ej: el usuario ya existe), lo lanzamos
      throw error;
    }
    
    // 4. Si todo sale bien, enviar una respuesta de éxito
    res.status(201).json({ message: 'Usuario creado exitosamente.', user: data.user });

  } catch (err) {
    // 5. Si ocurre cualquier otro error, enviar una respuesta de error genérica
    res.status(err.status || 500).json({ error: err.message });
  }
};


// --- TU FUNCIÓN DE LOGIN (se mantiene igual) ---
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
  }

  try {
    const { data, error } = await supabaseAnonClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    
    const adminEmail = 'bryan.caballero@example.com';
    const role = email.toLowerCase() === adminEmail ? 'admin' : 'usuario';
    
    console.log(`Email recibido: ${email.toLowerCase()}, Email admin: ${adminEmail}, Rol asignado: ${role}`);
    
    res.status(200).json({ 
        message: 'Inicio de sesión exitoso.', 
        session: data.session,
        role: role
    });

  } catch (err) {
    res.status(err.status || 401).json({ error: err.message });
  }
};