'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('events'); // Folder Name here
    const list = await pool.request().query(sqlQueries.eventslist);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getEvents
}