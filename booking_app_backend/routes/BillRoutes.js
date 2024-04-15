'use strict';

const express = require('express');
const controller = require('../controllers/BillController')
const router = express.Router();

const { getBillList } = controller

router.get('/bill', getBillList)

module.exports = {
  routes: router
}