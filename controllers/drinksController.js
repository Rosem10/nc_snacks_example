const { fetchDrinkById } = require('../models/drinksModel');

function getDrinkById(request, response) {
  const { drink_id } = request.params;
  console.log(drink_id);

  fetchDrinkById(drink_id).then((drink) => {
    response.status(200).send({ drink });
  });
}

module.exports = { getDrinkById };
