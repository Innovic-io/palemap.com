const cacheService = require('./cache.service')

const key = 'f160aac9ee5c27c3bc47f011bc9a1fafe4ed9a36'
const value = [1, 2, 3]

describe('cacheService', () => {
  test('Check data in cache.', () => {
    expect(cacheService.check(key)).toBe(false)
  })

  test('Set data in cache.', () => {
    cacheService.set(key, value)
    expect(cacheService.check(key)).toBe(true)
  })

  test('Get data from cache.', () => {
    cacheService.get(key, value)
    expect(cacheService.check(key)).toBe(true)
  })

  test('Delete data from cache.', () => {
    cacheService.delete(key)
    expect(cacheService.check(key)).toBe(false)
  })
})
