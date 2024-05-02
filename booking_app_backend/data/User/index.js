'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const createUser = async (user) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const execQuery = await pool.request()
      .input('FullName', sql.NChar(100), user.FullName)
      .input('Email', sql.NChar(100), user.Email)
      .input('CCCD', sql.NChar(100), user.CCCD)
      .input('Gender', sql.NChar(3), user.Gender)
      .input('PhoneNumber', sql.NChar(10), user.PhoneNumber)
      .input('Birthday', sql.Date, user.Birthday)
      .query(sqlQueries.Create_User);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  createUser
}