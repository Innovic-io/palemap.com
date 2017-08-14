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

      return res.render('index', { title: 'Jahorina ski hike', city: config.city, places: data.results })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })

})

router.get('/place', (req, res) => {
  const path = 'https://maps.googleapis.com/maps/api/place/details/json?';

  const url = queryBuilder.create(path, req.query, config.key)

  googleService.getPlaces(url)
    .then((data) => {
      let photoUrl;
      const placeMapUrl = `https://www.google.com/maps/embed/v1/place?key=${config.key}&q=place_id:${data.result.place_id}`

      if (data.result.hasOwnProperty('photos')) {
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.result.photos[0].photo_reference}&key=${config.key}`
      } else {
        photoUrl = data.result.icon
      }

      return res.render('index', { title: 'Jahorina ski hike', city: config.city, placeDetails: data.result, placePhoto: photoUrl, placeMap: placeMapUrl })
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
})

module.exports = router