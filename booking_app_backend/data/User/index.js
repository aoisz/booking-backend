'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

<<<<<<< HEAD
const getAllUser = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const list = await pool.request().query(sqlQueries.GetAllUser);
    return list.recordset;
=======
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
>>>>>>> origin
  } catch (error) {
    return error.message;
  }
}

module.exports = {
<<<<<<< HEAD
  getAllUser
=======
  createUser
>>>>>>> origin
}