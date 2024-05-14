const UserBookingInfoData = require('../data/UserBookingInfo');
const config = require('../config');

const getUserBookingInfoByBill_ID = async (req, res, next) => {
    try {
        const bill_id = req.query.id;
        const userbki_rs = await UserBookingInfoData.getUserBookingInfoByBill_ID(bill_id);
        res.send(userbki_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getUserBookingInfoByBill_ID
}