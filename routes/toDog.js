const express = require('express')
const router = express.Router()
const ToDogController = require('../controllers/toDog')

/**
 @summary GET ALL TO-DOGS
 @route   GET /to-dog-api/get-all-to-dogs/
 @desc    Get all to-dogs
 @access  Public
 @header  null
 @body    null
*/
router.get('/get-all-to-dogs/', ToDogController.get_all_to_dogs)

/**
 @summary GET SINGLE TO-DOGS
 @route   GET /to-dog-api/get-single-to-dog/:toDogId
 @desc    Get an individual to-dog based on _id
 @access  Public
 @header  null
 @body    null
*/
router.get('/get-single-to-dog/:toDogId', ToDogController.get_single_to_dog)

/**
 @summary CREATE NEW TO-DOG
 @route   POST /to-dog-api/create-new-to-dog/
 @desc    Post a new product
 @access  Public
 @header  { Content-Type: application/x-www-form-urlencoded }
 @body    { title: String, body: Number, completed: Boolean, urgent: Boolean }
*/
router.post('/create-new-to-dog/', ToDogController.create_new_to_dog)

/**
 @summary UPDATE A TO-DOG
 @route   PATCH /to-dog-api/update-existing-to-dog/:toDogId
 @desc    Update an individual to-dog based on a toDoId
 @access  Public
 @header  { Content-Type: application/json }
 @body    { "propName": String, "value": String }
 @example { propName: title, value: the updated value
*/
router.patch(
  '/update-existing-to-dog/:toDogId',
  ToDogController.update_existing_to_dog
)

module.exports = router
