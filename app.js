const express = require('express');
const { getSnacks, postSnack } = require('./controllers/snacksController');
const { getDrinkById } = require('./controllers/drinksController');

const app = express();
app.use(express.json());

app.get('/api/snacks', getSnacks);

app.get('/api/drinks/:drink_id', getDrinkById);

app.post('/api/snacks', postSnack);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const badRequests = ['22P02'];
  if (badRequests.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});
module.exports = app;
