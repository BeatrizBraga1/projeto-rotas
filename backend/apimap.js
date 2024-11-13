// backend/server.js
const express = require('express');
const cors = require('cors');
const placesRoutes = require('./routes/places');

const app = express();

app.use(cors({ origin: 'http://localhost:3000',}));

app.use('/api/places', placesRoutes);

app.listen(5000, () => console.log('Backend rodando na porta 5000'));
