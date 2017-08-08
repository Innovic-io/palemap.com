const router = require('express').Router()

const config = require('../../config/app.config')

router.get('/', (req, res) => {
  return res.render('index', { title: 'Jahorina ski hike', city: config.city, apiKey: config.key })
})

module.exports = router
