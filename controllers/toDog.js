const ToDog = require('../models/toDog')
const mongoose = require('mongoose')

exports.get_all_to_dogs = (req, res, next) => {
  res.status = 200

  ToDog.find()
    .select('_id title body completed urgent')
    .exec()
    .then(docs => {
      if (docs.length === 0) {
        res.json({
          route: BASE_URL + '/get-all-to-dogs/',
          status: 200,
          error: `The database collection called 'to-dogs' is empty.`
        })
      }

      const response = {
        route: BASE_URL + '/get-all-to-dogs',
        status: res.status,
        error: false,
        count: docs.length,
        toDogs: docs.map(doc => ({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
          completed: doc.completed,
          urgent: doc.urgent,
          request: {
            type: 'GET',
            url: BASE_URL + 'get-single-to-dog/' + doc._id
          }
        }))
      }

      res.json(response)
    })
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: BASE_URL + '/get-all-to-dogs/',
        status: err.status,
        error: err.message
      })
    })
}
