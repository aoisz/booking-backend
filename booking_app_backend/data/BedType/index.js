'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const updateBedType = async (bedType_id, room_id, status) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('BedType/sql'); // Folder Name here
    const execQuery = await pool.request()
      .input('ID', sql.Int, bedType_id)
      .input('Room_ID', sql.Int, room_id)
      .input('Status', sql.Int, status)
      .query(sqlQueries.updateStatus);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}





module.exports = {
  updateBedType
}