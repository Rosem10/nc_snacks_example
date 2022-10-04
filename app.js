const express = require('express');
const { getSnacks, postSnack } = require('./controllers/snacksController');
const { getDrinkById } = require('./controllers/drinksController');

const app = express();
app.use(express.json());

app.get('/api/snacks', getSnacks);

app.get('/api/drinks/:drink_id', getDrinkById);

app.post('/api/snacks', postSnack);

app.use((err, req, res, next) => {
  console.log(err, '<< unhandled err');
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
