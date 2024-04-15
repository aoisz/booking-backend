'use strict';

const express = require('express');
const controller = require('../controllers/CouponController');
const router = express.Router();

const { getCouponList } = controller

router.get('/coupon', getCouponList)

module.exports = {
  routes: router
}