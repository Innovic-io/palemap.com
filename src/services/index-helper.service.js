const config = require('../config/app.config')

/**
 *
 *
 * @param route
 * @param reqObject
 */
exports.render = function (route, reqObject, res) {
  const siteDetails = {
    title: 'Pale Map',
    city: config.city
  }

  res.render(route, Object.assign(siteDetails, reqObject))
}
