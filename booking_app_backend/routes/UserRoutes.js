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
  deleteUser,
  updateUserPoint,
  updateUserRollUp
} = controller

router.get('/Users', getUserList)
router.get('/User', getUserByPhone)
router.post('/User', addUser)
router.put('/User', updateUser)
router.put('/User/updateUserPoint', updateUserPoint)
router.put('/User/updateUserRollUp', updateUserRollUp)
// router.delete('/User', deleteCoupon)

module.exports = {
  routes: router
}