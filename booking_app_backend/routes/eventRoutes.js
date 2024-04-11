'use strict';

const express = require('express');
const eventCotroller = require('../controllers/eventController')
const router = express.Router();

const {getEvents} = eventCotroller

router.get('/testtable', getEvents)

module.exports = {
  routes: router
}