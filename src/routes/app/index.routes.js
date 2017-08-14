const router = require('express').Router()

const config = require('../../config/app.config')
const queryBuilder = require('../../services/query-builder.service')
const googleService = require('../../services/google.service')

router.get('/', (req, res) => {
  return res.render('index', { title: 'Jahorina ski hike', city: config.city })
})

router.get('/search', (req, res) => {
  const path = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`

  const url = queryBuilder.create(path, req.query, config.key)

  googleService.getPlaces(url)
    .then((data) => {

      return res.render('index', { title: 'Jahorina ski hike', city: config.city, place: data })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })

})

router.get('/place ')

module.exports = router