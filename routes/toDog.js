const express = require('express')
const router = express.Router()
const ToDogController = require('../controllers/toDog')

/**
 @route   GET /to-dog-api/get-all-to-dogs/
 @desc    Get all to-dogs
 @access  Public
 @header  null
 @body    null
*/
router.get('/get-all-to-dogs/', ToDogController.get_all_to_dogs)

/**
 @route   GET /to-dog-api/get-single-to-dog/:toDogId
 @desc    Get an individual to-dog based on _id
 @access  Public
 @header  null
 @body    null
*/
router.get('/get-single-to-dog/:toDogId', ToDogController.get_single_to_dog)

/**
 @route   POST /to-dog-api/create-new-to-dog/
 @desc    Post a new product
 @access  Public
 @header  { Content-Type: application/x-www-form-urlencoded }
 @body    { title: String, body: Number, completed: Boolean, urgent: Boolean }
*/
router.post('/create-new-to-dog/', ToDogController.create_new_to_dog)

module.exports = router
