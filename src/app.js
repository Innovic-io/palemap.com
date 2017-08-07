const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes/place.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/place', route);

app.listen(3000);

module.exports = app