const mongoose = require('mongoose')

const toDogSchema = mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String },
  completed: { type: Boolean, required: true },
  urgent: { type: Boolean, required: true },
})

module.exports = mongoose.model('ToDog', toDogSchema, 'to-dogs') // (name, schema, collection)
