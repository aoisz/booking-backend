'use strict';

const HotelData = require('../data/HotelInfo');
const config = require('../config');

const getHotelList = async (req, res, next) => {
    try {
        const hotel_rs = await HotelData.getHotelList();

        //
        console.log("GET - " + config.url + "/api/hotel")
        res.send(hotel_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const updateHotel = async (req, res, next) => {
    try {
        const hotel_id = req.query.id;
        const data = req.body;
        const hotel_rs = await HotelData.updateHotel(hotel_id, data)

        //
        console.log("PUT - " + config.url + "/api/hotel?id=" + hotel_id)
        res.send(hotel_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        const hotel_id = req.query.id;
        const hotel_rs = await HotelData.deleteHotel(hotel_id)

        //
        console.log("DELETE - " + config.url + "/api/hotel?id=" + hotel_id)
        res.send(hotel_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getHotelList,
    updateHotel,
    deleteHotel
}