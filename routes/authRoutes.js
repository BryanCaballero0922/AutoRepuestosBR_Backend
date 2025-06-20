const express = require('express');
const { registerUser, loginUser } = require('../controllers/authControllers');

const router = express.Router();

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
router.post('/register', registerUser);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;