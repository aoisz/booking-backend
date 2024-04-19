'use strict';

const express = require('express');
const controller = require('../controllers/RoomTypeController');
const router = express.Router();

const {
    getRoomTypeList,
    getRoomTypeById,
    addRoomType,
    updateRoomType,
    deleteRoomType
} = controller

router.get('/roomType', getRoomTypeList)
router.get('/roomType', getRoomTypeById)
router.post('/roomType', addRoomType)
router.put('/roomType', updateRoomType)
router.delete('/roomType', deleteRoomType)

module.exports = {
    routes: router
}