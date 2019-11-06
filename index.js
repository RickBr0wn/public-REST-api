require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Route imports
const toDogRoutes = require('./routes/toDog')

// Constants
const PORT = process.env.PORT || 3000
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : 'https://warm-island-43015.herokuapp.com'

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds243148.mlab.com:43148/public-api`,
  { useUnifiedTopology: true, useNewUrlParser: true }
)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB error!'))

// include bodyParser, so req.body can be accessible
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Routes
app.use('/get-all-to-dogs/', toDogRoutes)

// Default route
app.use('/', (req, res) => {
  res.status = 200
  res.json({
    route: '/',
    status: res.status,
    error: false,
    availableRoutes: [BASE_URL + '/get-all-to-dogs/']
  })
})

// Display a 404 - not found page
app.use((req, res, next) => {
  const err = new Error('404 - Not found')
  err.status = 404
  res.json({
    route: '404 - Not Found.',
    status: err.status,
    error: err.message,
    availableRoutes: [BASE_URL + '/get-all-to-dogs/']
  })
  next(err)
})

// Final catch all error
app.use((err, req, res, next) => {
  res.status = err.status || 500
  res.json({
    route: 'Unknown Error.',
    status: err.status,
    error: err.message,
    availableRoutes: [BASE_URL + '/get-all-to-dogs/']
  })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
