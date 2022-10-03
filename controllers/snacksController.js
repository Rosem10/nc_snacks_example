const res = require('express/lib/response');
const app = require('../app');
const fetchSnacks = require('../models/snacksModel');

function getSnacks(request, response) {
  fetchSnacks().then((snacks) => {
    response.status(200).send({ snacks });
  });
}

module.exports = getSnacks;
