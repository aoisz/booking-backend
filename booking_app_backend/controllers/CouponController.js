'use strict';

const CouponData = require('../data/Coupon');
const config = require('../config');

const getCouponList = async (req, res, next) => {
  try {
    const coupon_rs = await CouponData.getCouponList();

    //
    console.log("GET - http://localhost:" + config.port+"/api/coupon")
    res.send(coupon_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getCouponById = async (req, res, next) => {
  try {
    // host/api/coupon?id=coupon_id
    const coupon_id = req.query.id;
    const coupon_rs = await CouponData.getCouponById(coupon_id);
    
    //
    console.log("GET - http://localhost:" + config.port + "/api/coupon?id=" + coupon_id)
    res.send(coupon_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addCoupon = async (req, res, next) => {
  try {
    const data = req.body;
    const coupon_rs = await CouponData.createCoupon(data)
    
    //
    console.log("POST - http://localhost:" + config.port + "/api/coupon")
    res.send(coupon_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateCoupon = async (req, res, next) => {
  try {
    const coupon_id = req.query.id;
    const data = req.body;
    const coupon_rs = await CouponData.updateCoupon(coupon_id, data)
    
    //
    console.log("PUT - http://localhost:" + config.port + "/api/coupon?id=" + coupon_id)
    res.send(coupon_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteCoupon = async (req, res, next) => {
  try {
    const coupon_id = req.query.id;
    const coupon_rs = await CouponData.deleteCoupon(coupon_id)
    
    //
    console.log("DELETE - http://localhost:" + config.port + "/api/coupon?id=" + coupon_id)
    res.send(coupon_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getCouponList,
  getCouponById,
  addCoupon,
  updateCoupon,
  deleteCoupon
}