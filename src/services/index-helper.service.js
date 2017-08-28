const config = require('../config/app.config')

/**
 *
 *
 * @param route
 * @param reqObject
 */
exports.render = function (route, reqObject, res) {
  const siteDetails = {
    title: 'PaleMap',
    city: config.city,
    key: config.key
  }

  res.render(route, Object.assign(siteDetails, reqObject))
}
