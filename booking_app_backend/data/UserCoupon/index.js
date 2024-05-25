'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getUserCouponList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserCoupon'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_UserCouponList); // File SQL Query here
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getUserCouponListByID = async (user_id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserCoupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('user_id', sql.NVarChar(100), user_id)
      .query(sqlQueries.Read_UserCouponListByUserID); // File SQL Query here
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}


const getUserCouponByID = async (apply_discount_id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserCoupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('apply_discount_id', sql.Int, apply_discount_id)
      .query(sqlQueries.Read_UserCouponByID); // File SQL Query here
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}


const addUserCoupon = async (CouponID, UserID, IsUsed, NumberOfUses, DateScan) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserCoupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('CouponID', sql.Int, CouponID)
      .input('UserID', sql.Int, UserID)
      .input('IsUsed', sql.Int, IsUsed)
      .input('NumberOfUses', sql.Int, NumberOfUses)
      .input('DateScan', sql.Date, DateScan)
      .query(sqlQueries.Create_UserCoupon); // File SQL Query here
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateUserUseCoupon = async (UserCouponID, body) => {
  try {
    // console.log("Log -> "+UserCouponID)
    // console.log("Log ->", body)
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserCoupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('UserCouponID', sql.Int, UserCouponID)
      .input('UserID', sql.Int, body.UserID)
      .input('CouponID', sql.Int, body.CouponID)
      .query(sqlQueries.Update_UserCoupon); // File SQL Query here
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getUserCouponList,
  getUserCouponListByID,
  addUserCoupon,
  getUserCouponByID,
  updateUserUseCoupon
}