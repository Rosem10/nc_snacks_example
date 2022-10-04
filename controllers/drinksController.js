const { fetchDrinkById } = require('../models/drinksModel');

function getDrinkById(request, response, next) {
  const { drink_id } = request.params;
  fetchDrinkById(drink_id).then((drink) => {
    response.status(200).send({ drink });
  });
}

module.exports = { getDrinkById };
