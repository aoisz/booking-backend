'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAllUser = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const list = await pool.request().query(sqlQueries.GetAllUser);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getAllUser
}