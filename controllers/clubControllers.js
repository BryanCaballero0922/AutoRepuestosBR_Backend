const supabaseAdmin = require('../supabaseClient');
const {createClient} = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Obtener todos los clientes del club
exports.getAllClub = async (req, res) => {
  try {
    const { data, error } = await supabase.from('club').select('*');
    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Registrar nuevo cliente en el club
exports.createClub = async (req, res) => {
  try {
    const { nombre, telefono, descripcion, edad, taller } = req.body;

    const { data, error } = await supabase.from('club').insert([
      { nombre, telefono, descripcion, edad, taller }
    ]);

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar cliente del club por ID
exports.updateClub = async (req, res) => {
  try {
    const id = req.params.id;
    const campos = req.body;

    const { data, error } = await supabase
      .from('club')
      .update(campos)
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar cliente del club por ID
exports.deleteClub = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from('club')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};