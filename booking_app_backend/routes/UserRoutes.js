'use strict';

const express = require('express');
const controller = require('../controllers/UserController');
const router = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
const { 
  getUserList, 
  getUserById,
  getUserByPhone,
  addUser,
  updateUser,
  deleteUser
} = controller


router.get('/User', getUserByPhone)
router.post('/User', addUser)
router.put('/User', updateUser)
// router.delete('/User', deleteCoupon)
=======
const {
    addUser
} = controller

router.post('/user', addUser)
>>>>>>> parent of aa238b7 (Update)
=======
const {
    addUser
} = controller

router.post('/user', addUser)
>>>>>>> parent of aa238b7 (Update)

module.exports = {
    routes: router
}