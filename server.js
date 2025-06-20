const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas existentes 
app.use('/api/club', require('./routes/clubRoutes'));
app.use('/api/factura', require('./routes/facturaRoutes'));

// --- NUEVA RUTA DE AUTENTICACIÓN ---
app.use('/api/auth', require('./routes/authRoutes'));


const PORT = process.env.PORT || 3001; 
app.listen(
    PORT, 
    ()=>console.log(`Servidor corriendo en puerto ${PORT}`)); 