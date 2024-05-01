'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getByPriceRange = async (minPrice, maxPrice) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('RoomType');
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
        const sqlQueries = await utils.loadSqlQueries('RoomType'); // Folder Name here
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
        const sqlQueries = await utils.loadSqlQueries('RoomType'); // Folder Name here
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
        const sqlQueries = await utils.loadSqlQueries('RoomType');
        const list = await pool.request()
            .input("capacity", capacity)
            .input("minPrice", minPrice)
            .input("maxPrice", maxPrice)
            .query(sqlQueries.GetByCapacityAndPriceRange);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    getByPriceRange,
    getByCapacity,
    getByService,
    getByCapacityAndPriceRange
}