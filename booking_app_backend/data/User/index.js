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

const getUserList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_UserList);
    return list.recordset;
  } catch (error) {
    return error.message;
  }
}

const getUserById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const user = await pool.request().input('user_id', sql.Int, id).query(sqlQueries.Read_UserById);
    return user.recordset;
  } catch (error) {
    return error.message;
  }
}
const getUserByPhone = async (phone) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const user = await pool.request().input('user_phone', sql.Char, phone).query(sqlQueries.Read_UserByPhone);
    return user.recordset;
  } catch (error) {
    return error.message;
  }
}

const createUser = async (user) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const execQuery = await pool.request()
      .input('FullName', sql.NVarChar(100), user.FullName)
      .input('Email', sql.NVarChar(100), user.Email)
      .input('CCCD', sql.NVarChar(100), user.CCCD)
      .input('Gender', sql.NVarChar(3), user.Gender)
      .input('PhoneNumber', sql.NVarChar(10), user.PhoneNumber)
      .input('Birthday', sql.Date, user.Birthday)
      .query(sqlQueries.Create_User);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

const updateUser = async (user_id, user) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const execQuery = await pool.request()
      .input('UserID', sql.Int, user_id)
      .input('FullName', sql.NVarChar(100), user.FullName)
      .input('Email', sql.NVarChar(100), user.Email)
      .input('CCCD', sql.NVarChar(100), user.CCCD)
      .input('Gender', sql.NVarChar(3), user.Gender)
      .input('PhoneNumber', sql.NVarChar(10), user.PhoneNumber)
      .input('Birthday', sql.Date, user.Birthday)
      .query(sqlQueries.Update_User);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}
module.exports = {
  getUserList,
  getUserById,
  getUserByPhone,
  getEvents,
  createUser,
  updateUser
}