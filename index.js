const MAP = require('./map.json')

const PERSIAN_NUMBERS = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
}

const unicodeOf =
  (c) => {
    let result = c.charCodeAt(0).toString(16).toUpperCase()
    if (result.length === 3) {
      result = `0${result}`
    }
    return result
  }

const replaceAll =
  (text, map) => {
    let result = text
    const replace = Object.keys(map)
    const by = Object.values(map)
    for (let i = 0; i < replace.length; i++) {
      result = result.replace(new RegExp(replace[i], 'g'), by[i]);
    }
    return result
  }

const replaceMultiSpacesWithSingleSpace =
  (text) =>
    text.replace(/ +(?= )/g,'')

const preNormalize =
  (text, { trim = true, singleSpace = true }) => {
    const result = trim ? text.trim() : text
    return singleSpace
      ? replaceMultiSpacesWithSingleSpace(result)
      : result
  }

const postNormalize =
  (text, { persianNumber = false }) =>
    !persianNumber
      ? text
      : replaceAll(text, PERSIAN_NUMBERS)

const normalize =
  (text, options = {}) =>
    postNormalize(
      preNormalize(text, options)
        .split('')
        .map(c => MAP[unicodeOf(c)] || options.defaultValue || c)
        .join(''),
      options
    )

module.exports = {
  MAP,
  PERSIAN_NUMBERS,
  unicodeOf,
  replaceAll,
  replaceMultiSpacesWithSingleSpace,
  preNormalize,
  postNormalize,
  normalize
}
