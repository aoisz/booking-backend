'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getBillByRoom_ID = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Bill/sql'); // Folder Name here
    const bill = await pool.request().input('Room_ID', sql.Int, id).query(sqlQueries.getBillByRoom_ID);
    return bill.recordset;
  } catch (error) {
    return error.message;
  }
}

const getBillByID = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Bill/sql'); // Folder Name here
    const bill = await pool.request().input('ID', sql.Int, id).query(sqlQueries.getBillByID);
    return bill.recordset;
  } catch (error) {
    return error.message;
  }
}


const createBill = async (bill) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Bill/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('Room_ID', sql.Int, bill.room_ID)
      .input('RoomRate', sql.Int, bill.roomRate)
      .input('CheckInDay', sql.NChar(20), bill.checkInDay)
      .input('CheckOutDay', sql.NChar(20), bill.checkOutDay)
      .input('Duration', sql.Int, bill.duration)
      .input('BedType', sql.NChar(10), bill.bedType)
      .input('FinalCharge', sql.Float, bill.finalCharge)
      .query(sqlQueries.Create_Bill);
    return execQuery.recordset[0]["ID"];
  } catch (error) {
    return error.message;
  }
}





module.exports = {
  getBillByRoom_ID,
  getBillByID,
  createBill
}