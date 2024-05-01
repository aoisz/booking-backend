'use strict';

const RoomTypeData = require('../data/RoomType');

const getByPriceRange = async (req, res, next) => {
  try {
    const list = await RoomTypeData.getByPriceRange(req.body.minPrice, req.body.maxPrice);
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getByCapacity = async (req, res, next) => {
    try {
        const list = await RoomTypeData.getByCapacity(req.body.capacity);
        res.send(list);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getByService = async (req, res, next) => {
    try {
        const list = await RoomTypeData.getByService(req.body.service);
        res.send(list);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getByCapacityAndPriceRange = async (req, res, next) => {
    try {
        const list = await RoomTypeData.getByCapacityAndPriceRange(
          req.body.capacity,
          req.body.minPrice,
          req.body.maxPrice
        );
        res.send(list);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getByPriceRange,
    getByCapacity,
    getByService,
    getByCapacityAndPriceRange
}