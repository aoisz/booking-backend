'use strict';

const express = require('express');
const controller = require('../controllers/HotelInfoController');
const router = express.Router();

const {
    getHotelList,
    updateHotel,
    deleteHotel
} = controller

router.get('/hotel', getHotelList)
router.put('/hotel', updateHotel)
router.delete('/hotel', deleteHotel)

module.exports = {
    routes: router
}