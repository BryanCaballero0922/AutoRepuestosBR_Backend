const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseAnonClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Obtener todas las facturas
exports.getAllFacturas = async (req, res) => {
  try {
    const { data, error } = await supabaseAnonClient
      .from('facturas')
      .select('*');

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  return res;
};

// Crear una nueva factura
exports.createFactura = async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      rtn,
      direccion,
      nombre_pieza,
      precio,
      descripcion
    } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('facturas')
      .insert({
        nombre,
        telefono,
        rtn,
        direccion,
        nombre_pieza,
        precio,
        descripcion
      });

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};

// Actualizar una factura por RTN
exports.updateFactura = async (req, res) => {
  try {
    const { rtn } = req.params;
    const {
      nombre,
      telefono,
      direccion,
      nombre_pieza,
      precio,
      descripcion
    } = req.body;

    const { data, error } = await supabaseAnonClient
      .from('facturas')
      .update({
        nombre,
        telefono,
        direccion,
        nombre_pieza,
        precio,
        descripcion
      })
      .eq('rtn', rtn);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};

// Eliminar una factura por RTN
exports.deleteFactura = async (req, res) => {
  try {
    const { rtn } = req.params;

    const { error } = await supabaseAnonClient
      .from('facturas')
      .delete()
      .eq('rtn', rtn);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
  return res;
};
