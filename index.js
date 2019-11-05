require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
let CONNECTED = 'Not connected to database.'

// Connect to mongoDB
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds243148.mlab.com:43148/public-api`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(data => {
    CONNECTED = 'We are now connected to the database'
    console.log(
      `Welcome ${process.env.MONGO_USER}, You are now connected to ${process.env.MONGO_DB}.`
    )
  })
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

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
app.get('/test-route', (req, res) =>
  res.json({
    location: {
      page: '/test-route'
    }
  })
)

app.use('/', (req, res) =>
  res.json({
    location: {
      page: '/'
    }
  })
)

// Display a 404 - not found page
app.use((req, res, next) => {
  const err = new Error('404 - Not found')
  err.status = 404
  next(err)
})

// Final catch all error
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message
    }
  })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
