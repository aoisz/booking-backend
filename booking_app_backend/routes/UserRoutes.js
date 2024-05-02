'use strict';

const express = require('express');
const controller = require('../controllers/UserController');
const router = express.Router();

const {
    addUser
} = controller

router.post('/user', addUser)

module.exports = {
    routes: router
}