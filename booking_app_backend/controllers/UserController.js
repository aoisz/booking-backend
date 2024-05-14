'use strict'; 

const UserData = require('../data/User'); // Chú ý thay đổi tại đây
const config = require('../config'); 

const getUserList = async (req, res, next) => { 
  try { 
    const user_rs = await UserData.getUserList(); 

    console.log("GET - http://localhost:" + config.port+"/api/users") // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

const getUserById = async (req, res, next) => { 
  try { 
    const userId = req.query.id; 
    const user_rs = await UserData.getUserById(userId); 

    console.log("GET - http://localhost:" + config.port + "/api/user?id=" + userId) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

const getUserByPhone = async (req, res, next) => { 
  try { 
    const userPhone = req.query.phone; 
    const user_rs = await UserData.getUserByPhone(userPhone); 

    console.log("GET - http://localhost:" + config.port + "/api/user?phone=" + userPhone) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 
const addUser = async (req, res, next) => { 
  try { 
    const data = req.body; 
    const user_rs = await UserData.createUser(data) 

    console.log("POST - http://localhost:" + config.port + "/api/user") // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

const updateUser = async (req, res, next) => { 
  try { 
    const userId = req.query.id; 
    const data = req.body; 
    const user_rs = await UserData.updateUser(userId, data) 

    console.log("PUT - http://localhost:" + config.port + "/api/user?id=" + userId) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

const deleteUser = async (req, res, next) => { 
  try { 
    const userId = req.query.id; 
    const user_rs = await UserData.deleteUser(userId) 

    console.log("DELETE - http://localhost:" + config.port + "/api/user?id=" + userId) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
}

const updateUserPoint = async (req, res, next) => { 
  try { 
    const userId = req.query.id;
    const point = req.query.point;
    const user_rs = await UserData.updateUserPoint(userId, point) 

    console.log("PUT - http://localhost:" + config.port + "/api/user/updateUserPoint?id=" + userId) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

const updateUserRollUp = async (req, res, next) => { 
  try { 
    const userId = req.query.id;
    const user_rs = await UserData.updateUserRollUp(userId) 

    console.log("PUT - http://localhost:" + config.port + "/api/user/updateUserRollUp?id=" + userId) // Chú ý thay đổi endpoint
    res.send(user_rs); 
  } catch (error) { 
    res.status(400).send(error.message) 
  } 
} 

module.exports = { 
  getUserList, 
  getUserById, 
  getUserByPhone, 
  addUser, 
  updateUser, 
  deleteUser,
  updateUserPoint,
  updateUserRollUp
}