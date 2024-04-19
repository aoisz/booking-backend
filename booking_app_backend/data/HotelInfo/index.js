'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getHotelList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('HotelInfo/sql'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_HotelList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getHotelById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('HotelInfo/sql'); // Folder Name here
    const hotel = await pool.request().input('HotelID', sql.Int, id).query(sqlQueries.Read_HotelById);
    return hotel.recordset;
  } catch (error) {
    return error.message;
  }
}

const createHotel = async (hotel) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('HotelInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('Name', sql.NVarChar(100), hotel.Name)
      .input('Location', sql.NVarChar(250), hotel.Location)
      .input('PhoneNumber', sql.NVarChar(10), hotel.PhoneNumber)
      .query(sqlQueries.Create_Hotel);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateHotel = async (HotelID, hotel) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('HotelInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('Name', sql.NVarChar(100), hotel.Name)
      .input('Location', sql.NVarChar(250), hotel.Location)
      .input('PhoneNumber', sql.NVarChar(10), hotel.PhoneNumber)
      .query(sqlQueries.Update_Hotel);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const deleteHotel = async (HotelID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('HotelInfo/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('HotelID', sql.Int, HotelID)
      .query(sqlQueries.Delete_Hotel);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getHotelList,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
}