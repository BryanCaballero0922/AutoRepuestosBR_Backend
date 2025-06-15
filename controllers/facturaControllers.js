const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Obtener todas las facturas
exports.getAllFacturas = async (req, res) => {
  try {
    const { data, error } = await supabase.from('facturas').select('*');
    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva factura
exports.createFactura = async (req, res) => {
  try {
    const { nombre, telefono, rtn, direccion, nombre_pieza, precio, descripcion } = req.body;

    const { data, error } = await supabase.from('facturas').insert([
      { nombre, telefono, rtn, direccion, nombre_pieza, precio, descripcion }
    ]);

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar una factura por ID
exports.updateFactura = async (req, res) => {
  try {
    const id = req.params.id;
    const campos = req.body;

    const { data, error } = await supabase
      .from('facturas')
      .update(campos)
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una factura por ID
exports.deleteFactura = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from('facturas')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};