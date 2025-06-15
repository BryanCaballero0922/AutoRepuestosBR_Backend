const express = require('express');
const router = express.Router();

const facturaControllers = require('../controllers/facturaControllers'); // Ajusta el nombre del archivo si es otro

// Obtener todas las facturas
router.get('/', facturaControllers.getAllFacturas);
// Crear una nueva factura
router.post('/', facturaControllers.createFactura);
// Actualizar una factura por ID
router.put('/:id', facturaControllers.updateFactura);
// Eliminar una factura por ID
router.delete('/:id', facturaControllers.deleteFactura);
module.exports = router;