const objectHash = require('object-hash')
const fs = require('fs')
const mkdirp = require('mkdirp')
const jsonfile = require('jsonfile')

const hashes = new Map()

jsonfile.spaces = 2

exports.cacheFolderExists = function (folder) {
  return new Promise((resolve, reject) => {
    fs.stat(folder, (err, stat) => {
      if (err) return reject('Cache folder created.')

      return resolve(stat)
    })
  })
}

exports.createCacheFolder = function (folder) {
  return new Promise((resolve, reject) => {
    mkdirp(folder, (err) => {
      if (err) return reject(err)
    })
  })
}

/**
 * 
 *
 * @param fileName
 * @returns Promise
 */
exports.fileExists = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.stat(`caches/places/${fileName}.json`, (err, stat) => {

      if (err) return reject(err)

      return resolve(stat)
    })
  })
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
 * @returns Promise<JSON>
 */
exports.getFileContent = function (placeType) {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(`caches/places/${placeType}.json`, (err, data) => {
      if (err) return reject(err)

      return resolve(data)
    })
  })
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
