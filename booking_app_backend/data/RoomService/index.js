'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getTotalSurchargeByRoomId = async (roomId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('RoomServices/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('roomId', roomId)
      .query(sqlQueries.GetTotalSurchargeByRoomId);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  createUser
}