'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getCouponList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Coupon'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Get_CouponList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getCouponList
}