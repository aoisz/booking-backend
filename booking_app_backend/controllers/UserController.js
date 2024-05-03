<<<<<<< HEAD
'use strict'

const UserData = require('../data/User');

const getAllUser = async (req, res, next) => {
    try {
        const users = await UserData.getAllUser();
        res.send(users);
    } 
    catch (error) {
=======
const UserData = require('../data/User');
const config = require('../config');

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user_rs = await UserData.createUser(data)

        //
        console.log("POST - " + config.url + "/api/user")
        res.send(user_rs);
    } catch (error) {
>>>>>>> origin
        res.status(400).send(error.message)
    }
}

module.exports = {
<<<<<<< HEAD
    getAllUser
=======
    addUser
>>>>>>> origin
}