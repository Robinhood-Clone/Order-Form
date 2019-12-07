const express = require('express');
const app = express();
const port = 5050;
const path = require('path');
const Controller = require('./controller.js');
const bodyParser = require('body-parser');
const db = require('../database/dbinit.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening in on port ${port}!`));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/stocks', (req, res) => {
    Controller.getStockData(req, res);
})

app.get('/userpower', (req, res) => {
    Controller.getUserPower(req, res);
})

app.put('/updateUserPower', (req, res) => {
    let newPower = req.body.value
    Controller.updateUserPower(newPower, res);
})