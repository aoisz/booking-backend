'use strict';

const express = require('express');
const controller = require('../controllers/RoomTypeController');
const router = express.Router();

const { 
  getByPriceRange, 
  getByCapacity,
  getByService,
  getByCapacityAndPriceRange
} = controller;

router.post('/roomtype/getByPriceRange', getByPriceRange);
router.post('/roomtype/getByCapcity', getByCapacity);
router.post('/roomtype/getByService', getByService);
router.post('/roomtype/capacity&pricerange', getByCapacityAndPriceRange)

module.exports = {
  routes: router
}