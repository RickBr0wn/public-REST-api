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
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@basic-backend-api-nnvyx.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(data => {
    CONNECTED = 'We are now connected to the database'
    console.log(
      `Welcome ${process.env.MONGO_USER}, You are now connected to ${process.env.MONGO_DB}.`
    )
  })
  .catch(err => console.log(err))

mongoose.Promise = global.Promise

app.get('/', (req, res) => res.send(CONNECTED))

app.get('/test-route', (req, res) => res.send(`<h1>../test-route</h1>`))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
