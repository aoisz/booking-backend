'use strict';

const express = require('express');
const controller = require('../controllers/RoomController');
const router = express.Router();

const {
    getAllRoom,
    getRoomList,
    getRoomById,
    getRoomByRoomType,
    bookingRoom,
    addRoom,
    updateRoom,
    deleteRoom
} = controller

router.get('/room/get_all', getAllRoom);
router.get('/rooms', getRoomList)
router.get('/room', getRoomById)
router.get('/room', getRoomByRoomType)

router.post('/room', bookingRoom)
router.put('/room', updateRoom)
router.delete('/room', deleteRoom)

module.exports = {
    routes: router
}