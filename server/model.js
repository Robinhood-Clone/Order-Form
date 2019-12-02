const Stock = require('../database/seed.js')

module.exports = {
  getStockData: (callback) => {
    Stock.findAll()
    .then((data) => {
      console.log(data);
      callback(null, data);
    })
    .catch(() => callback('there was an err', null))
  }
}