const express = require('express');
const {
  getAllFacturas,
  createFactura,
  updateFactura,
  deleteFactura,
  guardarFacturaCompleta
} = require('../controllers/facturaControllers');

const router = express.Router();

router.get('/allFacturas', getAllFacturas);
router.post('/newFactura', createFactura);
router.put('/updateFactura/:rtn', updateFactura);
router.delete('/deleteFactura/:rtn', deleteFactura);
router.post('/guardarCompleta', guardarFacturaCompleta);

module.exports = router;
