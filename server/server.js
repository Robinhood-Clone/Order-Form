const express = require('express');
const app = express();
const port = 5050;
const path = require('path');
const Controller = require('./controller.js');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

