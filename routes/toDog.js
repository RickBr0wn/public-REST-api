const express = require('express')
const router = express.Router()
const ToDogController = require('../controllers/toDog')

/**
 @route   GET /get-all-to-dogs/
 @desc    Get all to-dogs
 @access  Public
 @body    null
*/
router.get('/', ToDogController.get_all_to_dogs)

module.exports = router
