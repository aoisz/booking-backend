'use strict';

const express = require('express');
const controller = require('../controllers/AccountController')
const router = express.Router();

const { getAccountList } = controller

router.get('/account', getAccountList)

module.exports = {
  routes: router
}