'use strict';

const express = require('express');
const controller = require('../controllers/UserBookingInfo');
const router = express.Router();

const {
    updateUserBookingInfoByID
} = controller


router.put('/booking', updateUserBookingInfoByID)


module.exports = {
    routes: router
}