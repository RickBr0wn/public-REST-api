require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Route imports
const toDogRoutes = require('./routes/toDog')

// Constants
const constants = require('./constants')

// Connect to database, and handle any errors
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds243148.mlab.com:43148/public-api`,
  { useUnifiedTopology: true, useNewUrlParser: true }
)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB error!'))

// Include bodyParser, so req.body can be accessible
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
app.use('/to-dog-api/', toDogRoutes)

// Create an error for 404 - Not Found routes
app.use('/', (req, res, next) => {
  const err = new Error('404 - Not found')
  err.status = 404
  next(err)
})

// Final catch all error
app.use((err, req, res, next) => {
  res.status = err.status || 500
  res.json({
    url: constants.BASE_URL + req.originalUrl,
    status: err.status,
    error: err.message,
    routes: [
      {
        type: 'GET',
        url: constants.BASE_URL + '/to-dog-api/get-all-to-dogs/'
      },
      {
        type: 'GET',
        url: constants.BASE_URL + '/to-dog-api/get-single-to-dog/' + ':toDogId'
      },
      {
        type: 'POST',
        url: constants.BASE_URL + '/to-dog-api/create-new-to-dog/'
      }
    ]
  })
})

app.listen(constants.PORT, () =>
  console.log(`Server started on port ${constants.PORT}`)
)
