const express = require('express');
const getSnacks = require('./controllers/snacksController');
const getDrinkById = require('./controllers/drinksController')

const app = express();

app.get('/api/snacks', getSnacks);
app.get('/api/drinks/:drink_id', getDrinkById)

module.exports = app;
