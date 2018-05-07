var express = require('express');
var router = express.Router();

var ctrlTimestamps = require('../controllers/timestamp.controllers.js');

// Timestamp routes

router
  .route('/:query')
  .get(ctrlTimestamps.getTime);


module.exports = router;