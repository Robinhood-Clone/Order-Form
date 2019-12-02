const Sequelize = require('sequelize');

const sequelize = new Sequelize('robinhoodclone', 'root', 'young', {
  host: 'localhost',
  dialect: 'mysql'
})
const Stock = sequelize.define('Stock', {
  stock_name: Sequelize.STRING,
  stock_symbol: Sequelize.STRING,
  owner: Sequelize.STRING,
  price: Sequelize.STRING
})
Stock.sync();
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