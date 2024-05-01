'use strict'

const UserData = require('../data/User');

const getAllUser = async (req, res, next) => {
    try {
        const users = await UserData.getAllUser();
        res.send(users);
    } 
    catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAllUser
}