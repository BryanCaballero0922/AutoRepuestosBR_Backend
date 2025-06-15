const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/clubRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(
    PORT, 
    ()=>console.log(`Servidor corriendo en puerto ${PORT}`));