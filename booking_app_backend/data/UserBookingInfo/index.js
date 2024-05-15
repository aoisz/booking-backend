'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getUserBookingInfoByBill_ID = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserBookingInfo/sql'); // Folder Name here
    const userbki = await pool.request().input('Bill_ID', sql.Int, id).query(sqlQueries.getUserBookingInfoByBill_ID);
    return userbki.recordset;
  } catch (error) {
    return error.message;
  }
}

const getUserBookingInfoByUser_ID = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserBookingInfo/sql'); // Folder Name here
    const userbki = await pool.request().input('User_ID', sql.Int, id).query(sqlQueries.getUserBookingInfoByUser_ID);
    return userbki.recordset;
  } catch (error) {
    return error.message;
  }
}


const createUserBookingInfo = async (userBookingInfo) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserBookingInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('User_ID', sql.Int, userBookingInfo.user_id)
      .input('ApplyDiscount_ID', sql.Int, userBookingInfo.apply_discount_id)
      .input('Bill_ID', sql.Int, userBookingInfo.bill_id)
      .input('TimeBooking', sql.NChar(20), userBookingInfo.timeBooking)
      .input('TypePayment', sql.NVarChar(100), userBookingInfo.typePayment)
      .input('TypeBooking', sql.NVarChar(10), userBookingInfo.typeBooking)
      .input('Status', sql.Int, userBookingInfo.status)
      .query(sqlQueries.Create_UserBookingInfo);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}


const deleteUserBookingInfoByID = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserBookingInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('ID', sql.Int, id)
      .query(sqlQueries.DeleteByID);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateUserBookingInfoByID = async (id, status) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('UserBookingInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('ID', sql.Int, id)
      .input('Status', sql.Int, status)
      .query(sqlQueries.updateStatus);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getUserBookingInfoByBill_ID,
  getUserBookingInfoByUser_ID,
  createUserBookingInfo,
  deleteUserBookingInfoByID,
  updateUserBookingInfoByID
}