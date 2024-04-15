'use strict';

const BillData = require('../data/Bill');

const getBillList = async (req, res, next) => {
  try {
    const list = await BillData.getBillList();
    res.send(list);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getBillList
}