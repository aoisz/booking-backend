'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getRoomList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const list = await pool.request().query(sqlQueries.Read_RoomList);
    let rooms = {};
    let services = []
    let surcharge = 0

    list.recordset.forEach(row => {
      let room = rooms[row.ID];
      // Nếu room này chưa được khởi tạo trong rooms, thì khởi tạo
      if (!room) {
        let images = row.Images.split(",")
        services = []
        surcharge = 0
        room = rooms[row.ID] = {
          ID: row.ID,
          Name: row.Name,
          Status: row.Status,
          Availability: row.Availability,
          Rating: row.Rating,
          Desciption: row.Desciption,
          RoomTypes: {},
          Images: [...images.map(item => item.trim())],
          Services: [],
          Surcharge: surcharge
        };
      }

      let roomType = room.RoomTypes[row.RoomTypeID];
      // Nếu loại phòng này chưa được khởi tạo, thì khởi tạo
      if (!roomType) {
        roomType = room.RoomTypes[row.RoomTypeID] = {
          type: row.RoomTypeName,
          BedTypes: {}
        };
      }

      if (!services.includes(row.RoomServiceName.trim())) {
        services.push(row.RoomServiceName.trim())
        surcharge = surcharge + row.Surcharge
      }
      room.Services = [...services];
      room.Surcharge = surcharge
      roomType.BedTypes[row.BedTypeID] = {
        type: row.BedTypeName,
        prices: row.RoomRate + surcharge,
      };
    });
    return rooms
  } catch (error) {
    return error.message;
  }
}

const getRoomById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const room = await pool.request().input('RoomID', sql.Int, id).query(sqlQueries.Read_RoomById);

    let rooms = {};
    let services = []
    let surcharge = 0

    room.recordset.forEach(row => {
      let room = rooms[row.ID];
      // Nếu room này chưa được khởi tạo trong rooms, thì khởi tạo
      if (!room) {
        let images = row.Images.split(",")
        room = rooms[row.ID] = {
          ID: row.ID,
          Name: row.Name,
          Status: row.Status,
          Availability: row.Availability,
          Rating: row.Rating,
          Desciption: row.Desciption,
          RoomTypes: {},
          Surcharge: surcharge,
          Images: [...images.map(item => item.trim())],
          Services: [],
          Surcharge: surcharge
        };
      }

      let roomType = room.RoomTypes[row.RoomTypeID];
      // Nếu loại phòng này chưa được khởi tạo, thì khởi tạo
      if (!roomType) {
        roomType = room.RoomTypes[row.RoomTypeID] = {
          type: row.RoomTypeName,
          BedTypes: {}
        };
      }

      if (!services.includes(row.RoomServiceName.trim())) {
        services.push(row.RoomServiceName.trim())
        surcharge = surcharge + row.Surcharge
      }
      // Thêm dịch vụ vào Set services
      room.Services = [...services];
      room.Surcharge = surcharge
      // Thêm thông tin giá và loại giường vào roomType
      roomType.BedTypes[row.BedTypeID] = {
        type: row.BedTypeName,
        prices: row.RoomRate + surcharge,
      };
    });
    return rooms
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