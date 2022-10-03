const db = require("../db/index.js")

function fetchDrinkById(id){
   return db.query(`SELECT * FROM drinks WHERE drink_id=$1;`, [id])
   .then(({rows: [drink]}) => {
    return drink
   })
}

module.exports = fetchDrinkById