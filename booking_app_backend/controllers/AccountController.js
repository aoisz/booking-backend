'use strict';

const AccountData = require('../data/Account');

const getAccountList = async (req, res, next) => {
  try {
    const list = await AccountData.getAccountList();
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getAccountList
}