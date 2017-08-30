const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const hbsJson = require('hbs-json')
const path = require('path')

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: '.env.test'})
} else {
  dotenv.config({path: '.env'})
}

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
  .catch(() => {
    return cacheService.createCacheFolder('./caches/places')
  })

let prevDate = new Date().getDate()

app.use(function (req, res, next) {
  let currentDate = new Date().getDate()

  if (currentDate - prevDate >= 10) {
    cacheService.clearCache('./caches')
      .then(() => {
        return cacheService.createCacheFolder('./caches/places')
      })
      .then(() => {
        prevDate = currentDate

        next()
      })
  } else {
    next()
  }
})

app.use('/', indexRoute)

app.use(function (req, res, next) {
  const error = new Error('404')

  next(error)
})

app.use(function (err, req, res, next) {
  if (err) {
    return res.status(404).json(error[err.message])
  }
})

app.listen(process.env.PORT || 3000)

module.exports = app
