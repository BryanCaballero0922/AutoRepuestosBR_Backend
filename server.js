const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/club', require('./routes/clubRoutes'));
app.use('/api/factura', require('./routes/facturaRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(
    PORT, 
    ()=>console.log(`Servidor corriendo en puerto ${PORT}`));