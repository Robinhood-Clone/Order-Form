const Model = require('./model.js');

module.exports = {
  getStockData: (req, res) => {
    Model.getStockData((err, data) => {
      if (err) {
        res.status(400).send('err getting data from database :', err);
      }
      res.status(200).send(data);
    })
  }
}