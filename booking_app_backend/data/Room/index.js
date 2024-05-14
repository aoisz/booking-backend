'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAllRoom = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql');
    const serviceQueries = await utils.loadSqlQueries('RoomService/sql');
    const bedTypeQueries = await utils.loadSqlQueries('BedType/sql');
    const roomTypeQueries = await utils.loadSqlQueries('RoomType/sql');
    const list = await pool.request().query(sqlQueries.GetAllRoom);
    var rooms = [];
    for (let i = 0; i < list.recordset.length; i++) {
      let surcharge = await pool.request().input("roomId", list.recordset[i]["ID"]).query(serviceQueries.GetTotalSurchargeByRoomId);
      surcharge = surcharge.recordset[0]['price'];
      let servicePrice = await pool.request().input("roomId", list.recordset[i]["ID"]).query(bedTypeQueries.GetTotalPriceByRoomId);
      servicePrice = servicePrice.recordset[0]['price'];
      let roomTypePrice = await pool.request().input("roomTypeId", list.recordset[i]["RoomType_ID"]).query(roomTypeQueries.GetPriceById);
      roomTypePrice = roomTypePrice.recordset[0]['price'];

      list.recordset[i]["Prices"] = surcharge + servicePrice + roomTypePrice;
      rooms.push(list.recordset[i]);
    }
    // const array = Object.values(rooms);
    return list.recordset;
  }
  catch (error) {
    return error.message;
  }
}

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
      if (!room) {
        let images = row.Images.split(",")
        services = []
        surcharge = 0
        room = rooms[row.ID] = {
          ID: row.ID,
          Name: row.Name.trim(),
          Rating: row.Rating,
          Description: row.Description.trim(),
          RoomTypes: {},
          Images: [...images.map(item => item.trim())],
          Services: []
        };
      }

      let roomType = room.RoomTypes[row.RoomType_Type.trim()];
      if (!roomType) {
        roomType = room.RoomTypes[row.RoomType_Type.trim()] = {
          type: row.RoomType_Type.trim(),
          name: row.RoomTypeName.trim(),
          prices: row.RoomTypePrices,
          BedTypes: {}
        };
      }

      if (!services.includes(row.RoomServiceName.trim())) {
        services.push(row.RoomServiceName.trim())
        surcharge = surcharge + row.Surcharge
      }
      room.Services = [...services];
      roomType.BedTypes[row.BedType_Type.trim()] = {
        type: row.BedType_Type.trim(),
        name: "Giường " + row.BedTypeName.trim(),
        prices: row.BedTypePrices,
        surcharge: surcharge,
        total: row.BedTypePrices + surcharge + row.RoomTypePrices,
        status: row.StatusBedType
      };
    });
    const array = Object.values(rooms);
    array.forEach(item => {
      item.RoomTypes = Object.values(item.RoomTypes)[0]
      item.RoomTypes.BedTypes = Object.values(item.RoomTypes.BedTypes)
    })
    return array
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
      if (!room) {
        let images = row.Images.split(",")
        services = []
        surcharge = 0
        room = rooms[row.ID] = {
          ID: row.ID,
          Name: row.Name.trim(),
          Rating: row.Rating,
          Description: row.Description.trim(),
          RoomTypes: {},
          Images: [...images.map(item => item.trim())],
          Services: []
        };
      }

      let roomType = room.RoomTypes[row.RoomType_Type.trim()];
      if (!roomType) {
        roomType = room.RoomTypes[row.RoomType_Type.trim()] = {
          type: row.RoomType_Type.trim(),
          name: row.RoomTypeName.trim(),
          prices: row.RoomTypePrices,
          BedTypes: {}
        };
      }

      if (!services.includes(row.RoomServiceName.trim())) {
        services.push(row.RoomServiceName.trim())
        surcharge = surcharge + row.Surcharge
      }
      room.Services = [...services];
      roomType.BedTypes[row.BedType_Type.trim()] = {
        type: row.BedType_Type.trim(),
        name: "Giường " + row.BedTypeName.trim(),
        prices: row.BedTypePrices,
        surcharge: surcharge,
        total: row.BedTypePrices + surcharge + row.RoomTypePrices,
        status: row.StatusBedType

      };
    });

    const array = Object.values(rooms);
    array.forEach(item => {
      item.RoomTypes = Object.values(item.RoomTypes)[0]
      item.RoomTypes.BedTypes = Object.values(item.RoomTypes.BedTypes)
    })
    return array
  } catch (error) {
    return error.message;
  }
}


const getRoomByRoomType = async (roomType) => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('Room/sql'); // Folder Name here
    const room = await pool.request().input('RoomType', sql.NVarChar(10), roomType).query(sqlQueries.Select_RoomByRoomType);

    let rooms = {};
    let services = []
    let surcharge = 0

    room.recordset.forEach(row => {
      let room = rooms[row.ID];
      if (!room) {
        let images = row.Images.split(",")
        services = []
        surcharge = 0
        room = rooms[row.ID] = {
          ID: row.ID,
          Name: row.Name.trim(),
          Status: row.Status,
          Availability: row.Availability,
          Rating: row.Rating,
          Description: row.Description.trim(),
          RoomTypes: {},
          Images: [...images.map(item => item.trim())],
          Services: []
        };
      }

      let roomType = room.RoomTypes[row.RoomType_Type.trim()];
      if (!roomType) {
        roomType = room.RoomTypes[row.RoomType_Type.trim()] = {
          type: row.RoomType_Type.trim(),
          name: row.RoomTypeName.trim(),
          prices: row.RoomTypePrices,
          BedTypes: {}
        };
      }

      if (!services.includes(row.RoomServiceName.trim())) {
        services.push(row.RoomServiceName.trim())
        surcharge = surcharge + row.Surcharge
      }
      room.Services = [...services];
      roomType.BedTypes[row.BedType_Type.trim()] = {
        type: row.BedType_Type.trim(),
        name: "Giường " + row.BedTypeName.trim(),
        prices: row.BedTypePrices,
        surcharge: surcharge,
        total: row.BedTypePrices + surcharge + row.RoomTypePrices
      };
    });

    const array = Object.values(rooms);
    array.forEach(item => {
      item.RoomTypes = Object.values(item.RoomTypes)[0]
      item.RoomTypes.BedTypes = Object.values(item.RoomTypes.BedTypes)
    })
    return array
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

module.exports = {
  getAllRoom,
  getRoomList,
  getRoomById,
  getRoomByRoomType,
  updateRoom,
}