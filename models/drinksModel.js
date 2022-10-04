const pool = require('../db/index');

function fetchDrinkById(id) {
  return pool
    .query(`SELECT * FROM drinks WHERE drink_id = $1`, [id])
    .then(({ rows: drinks }) => {
      if (drinks.length === 0) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
      return drinks[0];
    });
}

module.exports = { fetchDrinkById };
