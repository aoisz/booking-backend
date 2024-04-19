'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getRoomList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_RoomList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getRoomById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const room = await pool.request().input('RoomID', sql.Int, id).query(sqlQueries.Read_RoomById);
    return room.recordset;
  } catch (error) {
    return error.message;
  }
}

const createRoom = async (room) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('RoomType_ID', sql.Int, room.RoomType_ID)
      .input('Status', sql.NVarChar(100), room.Status)
      .input('Name', sql.NVarChar(100), room.Name)
      .input('Note', sql.NVarChar(100), room.Note)
      .query(sqlQueries.Create_Room);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateRoom = async (RoomID, room) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('RoomID', sql.Int, RoomID)
      .input('RoomType_ID', sql.Int, room.RoomType_ID)
      .input('Status', sql.NVarChar(100), room.Status)
      .input('Name', sql.NVarChar(100), room.Name)
      .input('Note', sql.NVarChar(100), room.Note)
      .query(sqlQueries.Update_Room);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const deleteRoom = async (RoomID) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('RoomID', sql.Int, RoomID)
      .query(sqlQueries.Delete_Room);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getRoomList,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
}