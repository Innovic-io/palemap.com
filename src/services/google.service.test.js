const googleService = require('./google.service')
const fetch = require('node-fetch')

describe('googleService', () => {
  test('Get location from Google Maps.', () => {
    expect.assertions(1)

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.8118946,18.5711013&radius=3000&type=school&key=AIzaSyB_SkJda2qonoJg10ttnfmunOwDgZweEcc'
    const urlBody = fetch(url).then(res => res.json())

    return googleService.getPlaces(url).then(urlBody => {
      expect(urlBody).toBe(urlBody);
    })
  })

  test('Unknown location on Google Maps.', () => {
    expect.assertions(1)

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.8118946,18.5711013&radius=3000&type=casino&key=AIzaSyB_SkJda2qonoJg10ttnfmunOwDgZweEcc'
    const urlBody = fetch(url).then(res => res.json())

    return googleService.getPlaces(url).then(urlBody => {
      expect(urlBody).toEqual([]);
    })
  })
})