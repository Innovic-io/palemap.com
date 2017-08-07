const objectHash = require('object-hash')

const hashes = new Map()

/**
 *
 *
 * @param hashValue
 * @returns {boolean}
 */
exports.check = function (hashValue) {
  const hash = objectHash(hashValue)

  return hashes.has(hash)
}

/**
 *
 *
 * @param hashValue
 * @returns {V}
 */
exports.get = function (hashValue) {
  const hash = objectHash(hashValue)

  return hashes.get(hash)
}

/**
 *
 *
 * @param hashValues
 * @param result
 * @returns {Map.<K, V>}
 */
exports.set = function (hashValues, result) {
  const hash = objectHash(hashValues)

  return hashes.set(hash, result)
}

/**
 *
 *
 * @param hashValue
 * @returns {boolean}
 */
exports.delete = function (hashValue) {
  const hash = objectHash(hashValue)

  return hashes.delete(hash);
}