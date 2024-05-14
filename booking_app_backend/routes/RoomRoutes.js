'use strict';

const express = require('express');
const controller = require('../controllers/RoomController');
const router = express.Router();

const {
    getAllRoom,
    getRoomList,
    getRoomById,
    getRoomByRoomType,
    getAllMyBooking,
    bookingRoom,
    addRoom,
    updateRoom,
} = controller

router.get('/room/get_all', getAllRoom);
router.get('/rooms', getRoomList)
router.get('/room', getRoomById)
router.get('/room/roomtype', getRoomByRoomType)
router.get('/mybooking', getAllMyBooking)

router.post('/room', bookingRoom)
router.put('/room', updateRoom)

module.exports = {
    routes: router
}