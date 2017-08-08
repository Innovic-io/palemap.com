const router = require('express').Router()

router.get('/', (req, res) => {


  return res.render('index', { title: 'Jahorina ski hike' })
})

module.exports = router