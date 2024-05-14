'use strict';

const express = require('express');
const controller = require('../controllers/RoomTypeController');
const router = express.Router();

const {
  getByPriceRange,
  getByCapacity,
  getByService,
  getByCapacityAndPriceRange,
  getRoomTypeList,
  getRoomTypeById,
  addRoomType,
  updateRoomType,
  deleteRoomType
} = controller;

router.post('/roomtype/getByPriceRange', getByPriceRange);
router.post('/roomtype/getByCapcity', getByCapacity);
router.post('/roomtype/getByService', getByService);
router.post('/roomtype/capacity&pricerange', getByCapacityAndPriceRange)
router.get('/roomtype/get_all', getRoomTypeList);
router.get('/roomType', getRoomTypeById)
router.post('/roomType', addRoomType)
router.put('/roomType', updateRoomType)
router.delete('/roomType', deleteRoomType)

module.exports = {
  routes: router
}