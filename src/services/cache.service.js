const objectHash = require('object-hash')
const fs = require('fs')
const jsonfile = require('jsonfile')

const hashes = new Map()

jsonfile.spaces = 2

/**
 * 
 *
 * @param fileName
 * @returns {*}
 */
exports.fileExists = function (fileName) {
  return fs.existsSync(`caches/places/${fileName}.json`)
}

/**
 *
 *
 * @param fileName
 * @param content
 * @returns {*}
 */
exports.createFile = function (fileName, content) {
  return jsonfile.writeFile(`caches/places/${fileName}.json`, content, function (err) {
    console.log(`All places like ${fileName} saved.`)
  })
}

/**
 *
 *
 * @param placeType
 * @returns {*}
 */
exports.getPlaces = function (placeType) {
  return jsonfile.readFileSync(`caches/places/${placeType}.json`)
}

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
exports.set = function (hashValue, result) {
  const hash = objectHash(hashValue)

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

  return hashes.delete(hash)
}
