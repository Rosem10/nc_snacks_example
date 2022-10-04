const fetchSnacks = require('../models/snacksModel');

function getSnacks(request, response) {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
}

module.exports = getSnacks;
