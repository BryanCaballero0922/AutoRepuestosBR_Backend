const supabaseAdmin = require('../supabaseClient');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAnonClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ... (la función registerUser se mantiene igual)
exports.registerUser = async (req, res) => {
    
};


// Iniciar sesión de un usuario (VERSIÓN MODIFICADA)
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
    //...
  }
};