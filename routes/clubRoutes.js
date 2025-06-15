const express = require('express');
const router = express.Router();

const clubControllers = require('../controllers/clubControllers'); // Asumiendo que tu código está en clubcontroller.js

// Obtener todos los clientes del club
router.get('/', clubControllers.getAllClub);
// Registrar nuevo cliente en el club
router.post('/', clubControllers.createClub);
// Actualizar cliente del club por ID
router.put('/:id', clubControllers.updateClub);
// Eliminar cliente del club por ID
router.delete('/:id', clubControllers.deleteClub);

module.exports = router;