const express = require('express');
const { getDrinkById } = require('./controllers/drinksController');
const getSnacks = require('./controllers/snacksController');

const app = express();

app.get('/api/snacks', getSnacks);
app.get('/api/drinks/:drink_id', getDrinkById);

module.exports = app;
