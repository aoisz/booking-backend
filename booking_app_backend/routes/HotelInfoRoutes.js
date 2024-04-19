'use strict';

const express = require('express');
const controller = require('../controllers/HotelInfoController');
const router = express.Router();

const {
    getHotelList,
    getHotelById,
    addHotel,
    updateHotel,
    deleteHotel
} = controller

router.get('/hotel', getHotelList)
router.get('/hotel', getHotelById)
router.post('/hotel', addHotel)
router.put('/hotel', updateHotel)
router.delete('/hotel', deleteHotel)

module.exports = {
    routes: router
}