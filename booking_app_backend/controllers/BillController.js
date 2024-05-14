'use strict';

const BillData = require('../data/Bill');

const getBillByRoom_ID = async (req, res, next) => {
  try {
    const room_id = req.query.id;
    const bill_rs = await BillData.getBillByRoom_ID(room_id);
    res.send(bill_rs);
  } catch (error) {
    res.status(400).send(error.message)
  }
}


module.exports = {
  getBillByRoom_ID
}