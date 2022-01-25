const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

// Setup static directory to serve
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead',
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead',
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some help text.',
    title: 'Help',
    name: 'Andrew Mead',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address is required',
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      console.log(error)
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log(error)
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
        latitude,
        longitude,
      })
    })
    
  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.status(404).render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found!',
  })
})

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.',
  })
})

app.listen(3000, () => {
  console.log('Sever is up on port 3000.')
})
