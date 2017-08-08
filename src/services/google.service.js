const request = require('request')

/**
 *
 * @returns {Promise<Array>}
 */
exports.getPlaces = function (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        return reject(error)
      }

      const place = JSON.parse(body)

      return resolve(place.results)
    })
  })
}
