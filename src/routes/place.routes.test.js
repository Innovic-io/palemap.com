const request = require('supertest')

const app = require('../app')

describe('placeRoutes', () => {
  test('Testing /api/place/search', (done) => {
    request(app).get('/api/place/search').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('Testing /api/place/list', (done) => {
    request(app).get('/api/place/list/').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
