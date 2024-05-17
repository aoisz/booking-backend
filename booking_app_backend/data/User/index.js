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
    const user = await pool.request().input('user_phone', sql.NChar(10), phone).query(sqlQueries.Read_UserByPhone);
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

const updateUserPoint = async (userId, point) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here
    const execQuery = await pool.request()
      .input('UserID', sql.Int, userId)
      .input('Point', sql.Int, point)
      .query(sqlQueries.UpdatePoint);
    return execQuery.recordset;
  } catch (error) {
    return error.message;
  }
}

function getDayNow() {
  // Create a new Date object for the current date and time
  const now = new Date();

  // Get the current year, month, and day from the Date object
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  const formattedDate = `${currentYear}-${formatDateComponent(currentMonth)}-${formatDateComponent(currentDay)}`;

  return formattedDate;
}

function formatDateComponent(dateComponent) {
  return dateComponent < 10 ? `0${dateComponent}` : dateComponent;
}

function getIndexDayNow() {
  const now = new Date();
  const dayOfWeekIndex = now.getDay();

  return dayOfWeekIndex;
}

const updateUserRollUp = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('User'); // Folder Name here

    // Execute the stored procedure UpdateWeekRollUp
    await pool.request()
      .input('UserID', sql.Int, userId)
      .input('DayOfWeek', sql.Int, getIndexDayNow())
      .execute('UpdateWeekRollUp');

    const execQuery = await pool.request()
      .input('UserID', sql.Int, userId)
      .input('LastDayRollUp', sql.Date, getDayNow())
      .query(sqlQueries.Update_UserRollUp);

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
  updateUser,
  updateUserPoint,
  updateUserRollUp
}