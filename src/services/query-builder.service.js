/**
 *
 *
 * @param path
 * @param queries
 * @param apiKey
 * @returns {string}
 */
exports.create = function (path, queries, apiKey) {
  const param = []

  for (let key in queries) {
    if (queries.hasOwnProperty(key) && queries[key].length) {
      param.push(`${key}=${queries[key]}`)
    }
  }

  param.push(`key=${apiKey}`)

  return path + param.join('&')
}