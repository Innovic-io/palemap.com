const router = require('express').Router()

const config = require('../../config/app.config')
const queryBuilder = require('../../services/query-builder.service')
const googleService = require('../../services/google.service')
const cacheService = require('../../services/cache.service')
const indexHelperService = require('../../services/index-helper.service')

router.get('/', (req, res) => {
  const index = Math.floor((Math.random() * config.numOfBackgrounds))

  return indexHelperService.render('partials/search', {
    backgroundImage: 'background-' + index + '.jpg'
  }, res)
})

router.get('/search', (req, res) => {
  const location = req.query.location.split(',')

  return indexHelperService.render('index', {
    placeType: req.query.type,
    latLocation: location[0],
    lngLocation: location[1]
  }, res)
})

/* router.get('/search', (req, res) => {
  const placeMapUrl = `https://www.google.com/maps/embed/v1/search?key=${config.key}&q=${req.query.type}+in+Pale&zoom=15&center=${config.city.location}`
  const title = `${req.query.type} in Pale`

  return res.render('index', { title: title, placeMap: placeMapUrl })
}) */

/* router.get('/search', (req, res) => {
  const title = `${req.query.type} in Pale`

  if (cacheService.check(req.query)) {
    return res.render('index', { title: title, city: config.city, places: cacheService.get(req.query) })
  }

  const path = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`

  const url = queryBuilder.create(path, req.query, config.key)

  googleService.getPlaces(url)
    .then((data) => {
      cacheService.set(req.query, data.results)

      return res.render('index', { title: title, city: config.city, places: data.results })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}) */

router.get('/place', (req, res) => {
  if (cacheService.check(req.query)) {
    let tempQuery = cacheService.get(req.query)
    const placeMapUrl = googleService.getPlaceMapById(config.key, tempQuery.place_id)
    const photoUrl = googleService.getPlacePhoto(config.key, tempQuery)

    return res.render('index', {
      title: tempQuery.name,
      city: config.city,
      placeDetails: tempQuery,
      placePhoto: photoUrl,
      placeMap: placeMapUrl
    })
  }

  const path = 'https://maps.googleapis.com/maps/api/place/details/json?'

  const url = queryBuilder.create(path, req.query, config.key)

  googleService.getPlaces(url)
    .then((data) => {
      const placeMapUrl = googleService.getPlaceMapById(config.key, data.result.place_id)
      const photoUrl = googleService.getPlacePhoto(config.key, data.result)

      cacheService.set(req.query, data.result)

      return res.render('index', {
        title: data.result.name,
        city: config.city,
        placeDetails: data.result,
        placePhoto: photoUrl,
        placeMap: placeMapUrl
      })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
})

module.exports = router
