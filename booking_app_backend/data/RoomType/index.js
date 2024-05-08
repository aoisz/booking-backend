'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getByPriceRange = async (minPrice, maxPrice) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('RoomType/sql');
        const list = await pool.request()
            .input("minPrice", minPrice)
            .input("maxPrice", maxPrice)
            .query(sqlQueries.GetByPriceRange);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const getByCapacity = async (capacity) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
        const list = await pool.request()
            .input("capacity", capacity)
            .query(sqlQueries.GetByCapacity);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByService = async (service) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('RoomType/sql'); // Folder Name here
        const list = await pool.request()
            .input("service", service)
            .query(sqlQueries.GetByService);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByCapacityAndPriceRange = async (capacity, minPrice, maxPrice) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('RoomType/sql');
        const list = await pool.request()
            .input("capacity", capacity) // truyen du lieu vao cau truy van, muon truyen du lieu nao vao cau truy van (file sql) thi m dung ham input nay
            .input("minPrice", minPrice) // cai ten trong "" phai giong voi trong file sql ten cot 
            .input("maxPrice", maxPrice)
            .query(sqlQueries.GetByCapacityAndPriceRange); 
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}
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
  getByPriceRange,
  getByCapacity,
  getByService,
  getByCapacityAndPriceRange,
  getRoomTypeList,
  getRoomTypeById,
  createRoomType,
  updateRoomType,
  deleteRoomType
}