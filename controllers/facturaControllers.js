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

exports.guardarFacturaCompleta = async (req, res) => {
  const { customerData, items, total } = req.body;

  if (!customerData || !items || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Faltan datos para crear la factura.' });
  }

  try {
    // 1. Insertar en la tabla maestra 'invoices' y obtener el ID de la nueva factura
    const { data: invoice, error: invoiceError } = await supabaseAnonClient
      .from('invoices')
      .insert({
        customer_name: customerData.nombre,
        customer_rtn: customerData.rtn,
        total_amount: total,
      })
      .select('id')
      .single(); // .single() para obtener el objeto directamente

    if (invoiceError) throw invoiceError;

    const newInvoiceId = invoice.id;

    // 2. Preparar los items del detalle, añadiendo el ID de la factura a cada uno
    const itemsToInsert = items.map(item => ({
      invoice_id: newInvoiceId,
      product_name: item.name,
      quantity: item.cantidad || 1,
      unit_price: Number(String(item.price).replace('$', '')),
      subtotal: Number(String(item.price).replace('$', '')) * (item.cantidad || 1),
    }));

    // 3. Insertar todos los items en la tabla 'invoice_items'
    const { error: itemsError } = await supabaseAnonClient
      .from('invoice_items')
      .insert(itemsToInsert);

    if (itemsError) throw itemsError;

    res.status(201).json({ message: 'Factura guardada exitosamente.', invoiceId: newInvoiceId });

  } catch (err) {
    console.error("Error al guardar factura:", err);
    res.status(500).json({ error: 'Error interno al guardar la factura.', details: err.message });
  }
};