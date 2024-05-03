'use strict';

const express = require('express');
const controller = require('../controllers/CouponController');
const router = express.Router();

const {
  getCouponList,
  getCouponById,
  addCoupon,
  updateCoupon,
  deleteCoupon
} = controller

router.get('/coupons', getCouponList)
router.get('/coupon', getCouponById)
router.post('/coupon', addCoupon)
router.put('/coupon', updateCoupon)
router.delete('/coupon', deleteCoupon)

module.exports = {
  routes: router
}