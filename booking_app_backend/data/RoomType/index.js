'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getRoomTypeList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_RoomTypeList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getRoomTypeById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
    const room = await pool.request().input('RoomTypeID', sql.Int, id).query(sqlQueries.Read_RoomTypeById);
    return room.recordset;
  } catch (error) {
    return error.message;
  }
}

const createRoomType = async (roomType) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('Name', sql.NVarChar(100), roomType.Name)
      .input('Maximumcapacity', sql.Int, roomType.Maximumcapacity)
      .input('RoomRate', sql.Int, roomType.RoomRate)
      .query(sqlQueries.Create_RoomType);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateRoomType = async (RoomTypeID, roomType) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('Name', sql.NVarChar(100), roomType.Name)
      .input('Maximumcapacity', sql.Int, roomType.Maximumcapacity)
      .input('RoomRate', sql.Int, roomType.RoomRate)
      .query(sqlQueries.Update_RoomType);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const deleteRoomType = async (RoomTypeID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('RoomTypeID', sql.Int, RoomTypeID)
      .query(sqlQueries.Delete_RoomType);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getRoomTypeList,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType
}