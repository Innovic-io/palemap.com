const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: '.env.test'})
}

const placeRoute = require('./routes/api/place.routes')
const indexRoute = require('./routes/app/index.routes')
const error = require('./config/error.config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

hbs.registerPartials(__dirname + '/../views/partials')

app.set('view engine', 'hbs')
app.set('views', path.normalize(__dirname + '/../views'))

app.use('/assets', express.static('./public'))

app.use('/api/place', placeRoute)

app.use('/', indexRoute)

app.use(function(req, res, next) {
  return res.status(404).json(error[404])
});

app.use(function (err, req, res, next) {
  console.log(err)
  return res.status(500).json(error[500])
})

app.listen(process.env.PORT || 3000)

module.exports = app