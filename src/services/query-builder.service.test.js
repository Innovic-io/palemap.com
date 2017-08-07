const queryBuilder = require('./query-builder.service')
const config = require('../config/app.config')

const queries = {
  location: '43.8118946,18.5711013',
  radius: '3000',
  type: 'casino'
}

const path = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${queries.location}&radius=${queries.radius}&type=${queries.type}&key=${config.key}`

describe('queryBuilderService', () => {
  test('Create URL with queries.', () => {
    expect(queryBuilder.create(path, queries, config.key)).toBe(url)
  })
})