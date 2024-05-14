'use strict';

const data = require('../data/UserCoupon');
const config = require('../config');
const _ = "usercoupon"

const getUserCouponList = async (req, res, next) => {
  try {
    const rs = await data.getUserCouponList();
    //
    console.log("GET - " + config.url + "/api/"+_+"/List")
    res.send(rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getUserCouponListByID = async (req, res, next) => {
  try {
    const user_id = req.query.userid;
    const rs = await data.getUserCouponListByID(user_id);
    //
    console.log("GET - " + config.url + "/api/"+_+"/ListByUserID")
    //
    res.send(rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addUserCoupon = async (req, res, next) => {
  try {
    const body = req.body;
    const rs = await data.addUserCoupon(body.CouponID, body.UserID, body.IsUsed, body.NumberOfUses, body.DateScan);
    //
    console.log("POST - " + config.url + "/api/"+_+"/Add - " + body.CouponID, body.UserID, body.IsUsed, body.NumberOfUses, body.DateScan)
    //
    res.send(rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateUserUseCoupon = async (req, res, next) => {
  try {
    const UserCouponID =  req.query.ID;
    const body = req.body;
    const rs = await data.updateUserUseCoupon(UserCouponID, body);
    //
    console.log("PUT - " + config.url + "/api/"+_+"/UserUseCoupon")
    //
    res.send(rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getUserCouponList,
  getUserCouponListByID,
  addUserCoupon,
  updateUserUseCoupon
}