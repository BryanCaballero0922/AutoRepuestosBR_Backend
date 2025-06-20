const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAnonClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Obtener todos los clientes del club
exports.getAllClub = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('club')
      .select('*');
    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

// Registrar nuevo cliente en el club
exports.createClub = async (req, res) => {
  try {
    const { nombre, telefono, descripcion, edad, taller } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('club')
      .insert({
        nombre,
        telefono,
        descripcion,
        edad,
        taller
      });

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};

// Actualizar cliente del club por TALLER
exports.updateClub = async (req, res) => {
  try {
    const { taller } = req.params;
    const { nombre, telefono, descripcion, edad } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('club')
      .update({ nombre, telefono, descripcion, edad })
      .eq('taller', taller);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};

// Eliminar cliente del club por TALLER
exports.deleteClub = async (req, res) => {
  try {
    const { taller } = req.params;

    const { error } = await supabaseAnonClient
      .from('club')
      .delete()
      .eq('taller', taller);

    if (error) throw error;
    res.status(204).send(); // No content
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};