const router = require('express').Router()

const queryBuilder = require('../services/query-builder.service')
const cacheService = require('../services/cache.service')
const googleService = require('../services/google.service')
const config = require('../config/app.config')

const path = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`

router.get('/search', function (req, res) {
  if (cacheService.check(req.query)) {
    return res.json(cacheService.get(req.query))
  }

  const url = queryBuilder.create(path, req.query, config.key)

  googleService.getPlaces(url)
    .then((data) => {
      cacheService.set(req.query, data)

      return res.json(data)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
})

router.get('/list', function (req, res) {
  res.json(config.city)
})

module.exports = router
