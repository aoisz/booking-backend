'use strict';

const RoomData = require('../data/Room');
const config = require('../config');

const getRoomList = async (req, res, next) => {
    try {
        const room_rs = await RoomData.getRoomList();

        //
        console.log("GET - " + config.url + "/api/room")
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getRoomById = async (req, res, next) => {
    try {
        // host/api/room?id=room_id
        const room_id = req.query.id;
        const room_rs = await RoomData.getRoomById(room_id);

        //
        console.log("GET - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getRoomByRoomType = async (req, res, next) => {
    try {
        const room_type = req.query.roomtype;
        const room_rs = await RoomData.getRoomByRoomType(room_type);

        //
        console.log("GET - " + config.url + "/api/room?roomtype=" + room_type)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}



const addRoom = async (req, res, next) => {
    try {
        const data = req.body;
        const room_rs = await RoomData.createRoom(data)

        //
        console.log("POST - " + config.url + "/api/room")
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const room_id = req.query.id;
        const data = req.body;
        const room_rs = await RoomData.updateRoom(room_id, data)

        //
        console.log("PUT - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        const room_id = req.query.id;
        const room_rs = await RoomData.deleteRoom(room_id)

        //
        console.log("DELETE - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getRoomList,
    getRoomById,
    getRoomByRoomType,
    addRoom,
    updateRoom,
    deleteRoom
}