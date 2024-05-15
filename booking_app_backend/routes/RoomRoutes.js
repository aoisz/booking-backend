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
    deleteMyBooking
} = controller

router.get('/room/get_all', getAllRoom);
router.get('/rooms', getRoomList)
router.get('/room', getRoomById)
router.get('/room/roomtype', getRoomByRoomType)
router.get('/mybooking', getAllMyBooking)

router.post('/room', bookingRoom)
router.delete('/mybooking', deleteMyBooking)

module.exports = {
    routes: router
}