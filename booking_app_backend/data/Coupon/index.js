'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getCouponList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_CouponList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getCouponById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const coupon = await pool.request().input('coupon_id', sql.Int, id).query(sqlQueries.Read_CouponById);
    return coupon.recordset;
  } catch (error) {
    return error.message;
  }
}

const createCoupon = async (coupon) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('Name', sql.NVarChar(100), coupon.Name)
      .input('AmountDiscount', sql.Int, coupon.AmountDiscount)
      .input('PercentDiscount', sql.Float, coupon.PercentDiscount)
      .input('EffectiveDate', sql.Date, coupon.EffectiveDate)
      .input('ExpirationDate', sql.Date, coupon.ExpirationDate)
      .query(sqlQueries.Create_Coupon);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateCoupon = async (coupon_id, coupon) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('CouponID', sql.Int, coupon_id)
      .input('Name', sql.NVarChar(100), coupon.Name)
      .input('AmountDiscount', sql.Int, coupon.AmountDiscount)
      .input('PercentDiscount', sql.Float, coupon.PercentDiscount)
      .input('EffectiveDate', sql.Date, coupon.EffectiveDate)
      .input('ExpirationDate', sql.Date, coupon.ExpirationDate)
      .query(sqlQueries.Update_Coupon);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const deleteCoupon = async (coupon_id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const execQuery = await pool.request()
      .input('CouponID', sql.Int, coupon_id)
      .query(sqlQueries.Delete_Coupon);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getCouponList,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
}