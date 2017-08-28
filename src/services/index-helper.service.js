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
    description: 'Simpe app for preview any place in Pale.',
    city: config.city,
    key: config.key
  }

  res.render(route, Object.assign(siteDetails, reqObject))
}
