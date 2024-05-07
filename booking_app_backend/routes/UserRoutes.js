'use strict';

const express = require('express');
const controller = require('../controllers/UserController');
const router = express.Router();

const {
  getUserList,
  getUserById,
  getUserByPhone,
  addUser,
  updateUser,
  deleteUser
} = controller

router.get('/User', getUserList)
router.get('/User', getUserByPhone)
router.post('/User', addUser)
router.put('/User', updateUser)
// router.delete('/User', deleteCoupon)

module.exports = {
  routes: router
}