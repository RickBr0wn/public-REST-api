const ToDog = require('../models/toDog')
const mongoose = require('mongoose')

const constants = require('../constants')

exports.get_all_to_dogs = (req, res, next) => {
  res.status = 200

  ToDog.find()
    .select('_id title body completed urgent')
    .exec()
    .then(docs => {
      if (docs.length === 0) {
        res.json({
          route: constants.BASE_URL + '/to-dog-api/get-all-to-dogs/',
          status: 200,
          message: `Welcome to to-dogs. Please add a new 'to-dog' to get started.`
        })
      }

      const response = {
        route: constants.BASE_URL + '/to-dog-api/get-all-to-dogs/',
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
            url: constants.BASE_URL + '/to-dog-api/get-single-to-dog/' + doc._id
          }
        }))
      }

      res.json(response)
    })
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: constants.BASE_URL + '/to-dog-api/get-all-to-dogs/',
        status: res.status,
        error: err.message
      })
    })
}

exports.get_single_to_dog = (req, res, next) => {
  const id = req.params.toDogId

  ToDog.findById(id)
    .select('_id title body completed urgent')
    .exec()
    .then(doc => {
      if (doc) {
        res.status = 200
        res.json({
          route: constants.BASE_URL + '/to-dog-api/get-single-to-dog/',
          status: res.status,
          error: false,
          toDog: doc,
          request: {
            type: 'GET',
            url: constants.BASE_URL + '/to-dog-api/get-single-to-dog/' + id
          }
        })
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided Object ID' })
      }
    })
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: constants.BASE_URL + '/to-dog-api/get-single-to-dog/',
        status: res.status,
        error: err.message
      })
    })
}

exports.create_new_to_dog = (req, res, next) => {
  const newToDog = new ToDog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    completed: req.body.completed,
    urgent: req.body.urgent
  })

  newToDog
    .save()
    .then(result => {
      console.log('Result: ', result)
      res.status(201).json({
        route: constants.BASE_URL + '/to-dog-api/create-new-to-dog/',
        error: false,
        message: 'Created new to-dog successfully',
        createdToDog: {
          _id: result._id,
          title: result.title,
          body: result.body,
          completed: result.completed,
          urgent: result.urgent,
          request: {
            type: 'GET',
            url:
              constants.BASE_URL + '/to-dog-api/get-single-to-dog/' + result._id
          }
        }
      })
    })
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: constants.BASE_URL + '/to-dog-api/create-new-to-dog/',
        status: res.status,
        error: err.message
      })
    })
}

exports.update_existing_to_dog = (req, res, next) => {
  const id = req.params.toDogId

  ToDog.updateOne({ _id: id }, { $set: req.body })
    .select('title body completed urgent _id')
    .exec()
    .then(result => {
      res.status = 200
      res.json({
        route: constants.BASE_URL + '/to-dog-api/update-existing-to-dog/',
        status: 200,
        error: false,
        message: `Updated the 'to-dog' with the id of ${id}`,
        request: {
          type: 'GET',
          url: constants.BASE_URL + '/to-dog-api/get-single-to-dog/' + id
        }
      })
    })
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: constants.BASE_URL + '/to-dog-api/update-existing-to-dog/',
        status: res.status,
        error: err.message
      })
    })
}

exports.delete_existing_to_dog = (req, res, next) => {
  const id = req.params.toDogId
  ToDog.deleteOne({ _id: id })
    .select('title body completed urgent _id')
    .exec()
    .then(result =>
      res.status(200).json({
        route: constants.BASE_URL + '/to-dog-api/delete-existing-to-dog/' + id,
        status: 200,
        error: false,
        message: `The 'to-dog' with the id of ${id} has been successfully deleted`,
        deletedCount: result.deletedCount,
        request: {
          type: 'GET',
          url: constants.BASE_URL + '/to-dog-api/get-all-to-dogs/'
        }
      })
    )
    .catch(err => {
      res.status = err.status || 500
      res.json({
        route: constants.BASE_URL + '/to-dog-api/delete-existing-to-dog/',
        status: res.status,
        error: err.message
      })
    })
}
