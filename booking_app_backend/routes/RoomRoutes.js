'use strict';

const express = require('express');
const controller = require('../controllers/RoomController');
const router = express.Router();

const {
    getRoomList,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom
} = controller

router.get('/rooms', getRoomList)
router.get('/room', getRoomById)
router.post('/room', addRoom)
router.put('/room', updateRoom)
router.delete('/room', deleteRoom)

module.exports = {
    routes: router
}