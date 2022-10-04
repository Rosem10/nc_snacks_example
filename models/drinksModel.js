const pool = require('../db/index');

function fetchDrinkById(id) {
  return pool
    .query(`SELECT * FROM drinks WHERE drink_id = $1`, [id])
    .then(({ rows: drinks }) => {
      return drinks[0];
    });
}

module.exports = { fetchDrinkById };
