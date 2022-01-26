// const url = 'http://api.weatherstack.com/current?access_key=83b3344590bc46aafd606110791b2084&query=37.8267,-122.4233&units=f'
// const url = 'http://api.weatherstack.com/current?access_key=83b3344590bc46aafd606110791b2084&query='

// request({url: url, json: true}, (error, response) => {
//   if (error) {
//     console.log('Unable to connect weather service!')
//   } else if (response.body.error) {
//     console.log('Unable to find location')
//   } else {
//     const current = response.body.current
//     console.log(`It is currently ${current.temperature} degree out. There is a ${current.precip} chance of rain.`)
//     console.log(`It feels like ${current.feelslike} degree.`);
//   }
// })

const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=83b3344590bc46aafd606110791b2084&query=' + latitude + ',' + longitude + '&units=f'

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const current = body.current
      callback(undefined,
        `It is currently ${current.temperature} degree out. There is a ${current.precip}% chance of rain. The humidity is ${current.humidity}.`
      )
    }
  })
}

module.exports = forecast