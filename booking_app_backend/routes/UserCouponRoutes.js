'use strict';

const _ = "usercoupon"

const express = require('express');
const controller = require('../controllers/UserCouponController');
const router = express.Router();

const { 
  getUserCouponList,
  getUserCouponListByID,
  addUserCoupon,
  updateUserUseCoupon
} = controller

router.get('/'+_+'/List', getUserCouponList)
router.get('/'+_+'/ListByUserID', getUserCouponListByID)
router.post('/'+_+'/Add', addUserCoupon)
router.put('/'+_+'/UserUseCoupon', updateUserUseCoupon)

module.exports = {
  routes: router
}