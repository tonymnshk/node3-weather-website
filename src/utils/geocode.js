const request = require('request')

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURI(address) +
    '.json?access_token=pk.eyJ1IjoidG9ueW9zdSIsImEiOiJja2hhMDR2M2YwdGx4MnhtenU1dHBsaDhhIn0.tSco6TH9vW3zq6EiU3992w&limit=1'

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log('Unable to connect location services')
      callback('Unable to connect location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find locaiton. Try another search.', undefined)
    } else {
      const longitude = body.features[0].center[0]
      const latitude = body.features[0].center[1]
      const location = body.features[0].place_name
      callback(undefined, {
        longitude,
        latitude,
        location
      })
    }
  })
}

module.exports = geocode
