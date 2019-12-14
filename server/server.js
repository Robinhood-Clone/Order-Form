const express = require('express');
const app = express();
const port = 5050;
const path = require('path');
const Controller = require('./controller.js');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening in on port ${port}!`));

app.param('stock_symbol', function(req, res, next, stock_symbol) {
    next();
})

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/stocks/:stock_symbol', express.static(path.join(__dirname, '../client/dist')));

app.get('/stocks', (req, res) => {
    let id = req.query.stock_symbol
    Controller.getStockData(id, res);
})

app.get('/userpower', (req, res) => {
    Controller.getUserPower(req, res);
})

app.put('/updateUserPower', (req, res) => {
    let newPower = req.body.value
    Controller.updateUserPower(newPower, res);
})