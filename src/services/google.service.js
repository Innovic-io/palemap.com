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

      return resolve(place)
    })
  })
}

exports.getPlaceMapById = function (apiKey, placeId) {
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`
}

exports.getPlacePhoto = function (apiKey, queryPlace) {
  if (queryPlace.hasOwnProperty('photos') && Array.isArray(queryPlace.photos)) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${queryPlace.photos[0].photo_reference}&key=${apiKey}`
  } else {
    return queryPlace.icon
  }
}
