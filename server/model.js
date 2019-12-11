const Sequelize = require('sequelize');
const Op = require('Sequelize').Op


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
const User = sequelize.define('User', {
  username: Sequelize.STRING,
  power: Sequelize.STRING,
})
User.sync();

module.exports = {
  getStockData: (id, callback) => {
    Stock.findAll({
      where: {
        [Op.or] : [{ stock_symbol : id}, { id: id }]
      }
    })
    .then((data) => {
      callback(null, data);
    })
    .catch(() => callback('there was an err', null))
  },
  getUserPower: (callback) => {
    User.findAll({
      where: {
        username: 'wsdfre2'
      }
    })
    .then((data) => {
      callback(null, data);
    })
    .catch(() => callback('there was an err', null))
  },
  updateUserPower: (power, callback) => {
    User.findAll({
      where: {
        username: 'wsdfre2'
      }
    })
    .on('success', function(user) {
      if (user) {
        user.update({
          power: power
        })
        .success(function () {})
      }
    })
    .then(()=> callback(null))
    .catch(()=> callback('there was an error updating'))
  }
}