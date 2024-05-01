'use strict'

const express = require('express');
const controller = require('../controllers/UserController');
const router = express.Router();

const { getAllUser } = controller;

router.get('/user', getAllUser);

module.exports = {
    routes: router
}