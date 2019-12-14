const Model = require('./model.js');

module.exports = {
  getStockData: (id, res) => {
    Model.getStockData(id, (err, data) => {
      if (err) {
        res.status(400).send('err getting data from stock database');
      }
      res.status(200).send(data);
    })
  },
  getUserPower: (req, res) => {
    Model.getUserPower((err, data) => {
      if (err) {
        res.status(400).send('err getting data from user database');
      }
      res.status(200).send(data)
    })
  },
  updateUserPower: (power, res) => {
    Model.updateUserPower(power, (err) => {
      if (err) {
        res.status(400).send('err updating power')
      }
      res.status(200).send('updated user power')
    })
  }
}