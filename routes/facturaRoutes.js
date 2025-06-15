const express = require('express');
const {
  getAllFacturas,
  createFactura,
  updateFactura,
  deleteFactura
} = require('../controllers/facturaControllers');

const router = express.Router();

router.get('/allFacturas', getAllFacturas);
router.post('/newFactura', createFactura);
router.put('/updateFactura/:rtn', updateFactura);
router.delete('/deleteFactura/:rtn', deleteFactura);

module.exports = router;
