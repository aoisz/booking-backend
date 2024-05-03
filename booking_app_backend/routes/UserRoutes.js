<<<<<<< HEAD
'use strict'
=======
'use strict';
>>>>>>> origin

const express = require('express');
const controller = require('../controllers/UserController');
const router = express.Router();

<<<<<<< HEAD
const { getAllUser } = controller;

router.get('/user', getAllUser);
=======
const {
    addUser
} = controller

router.post('/user', addUser)
>>>>>>> origin

module.exports = {
    routes: router
}