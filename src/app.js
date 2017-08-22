const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const hbsJson = require('hbs-json')
const path = require('path')

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: '.env.test'})
}

const placeRoute = require('./routes/api/place.routes')
const indexRoute = require('./routes/app/index.routes')
const error = require('./config/error.config')

const cacheService = require('./services/cache.service')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

hbs.registerPartials(path.join(__dirname, '/../views/partials'))

hbs.registerHelper('json', hbsJson);

app.set('view engine', 'hbs')
app.set('views', path.normalize(path.join(__dirname, '/../views')))

app.use('/assets', express.static('./public'))

cacheService.cacheFolderExists('./caches/places')
  .catch((data) => {
    console.log(data)
    return cacheService.createCacheFolder('./caches/places')
  })

app.use('/api/place', placeRoute)

app.use('/', indexRoute)

app.use(function (req, res, next) {
  return res.status(404).json(error[404])
})

app.use(function (err, req, res, next) {
  console.log(err)
  return res.status(500).json(error[500])
})

app.listen(process.env.PORT || 3000)

module.exports = app
