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
          error: {
            hasError: true,
            error: `The database collection called 'to-dogs' is empty.`
          }
        })
      }

      const response = {
        route: '/get-all-to-dogs',
        status: res.status,
        count: docs.length,
        toDogs: docs.map(doc => ({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
          completed: doc.completed,
          urgent: doc.urgent,
          request: {
            type: 'GET',
            url:
              'https://warm-island-43015.herokuapp.com/get-single-to-dog/' +
              doc._id
          }
        }))
      }

      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.status = 500
      res.json({
        error: {
          hasError: true,
          error: err.message
        }
      })
    })
}
