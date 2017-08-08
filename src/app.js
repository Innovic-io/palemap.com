const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const route = require('./routes/place.routes');
const error = require('./config/error.config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/place', route);

app.use(function(req, res, next) {
  return res.status(404).json(error[404]);
});

app.use(function (err, req, res, next) {
  return res.status(500).json(error[500])
})

app.listen(PRODUCTION_PORT);

module.exports = app