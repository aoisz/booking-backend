'use strict';

const CouponData = require('../data/Coupon');

const getCouponList = async (req, res, next) => {
  try {
    const list = await CouponData.getCouponList();
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getCouponList
}