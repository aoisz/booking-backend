'use strict';

const RoomData = require('../data/Room');
const BillData = require('../data/Bill');
const UserBookingInfoData = require('../data/UserBookingInfo');
const BedTypeData = require('../data/BedType');

const config = require('../config');

const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await RoomData.getAllRoom();
        res.send(rooms);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getRoomList = async (req, res, next) => {
    try {
        const room_rs = await RoomData.getRoomList();

        //
        console.log("GET - " + config.url + "/api/rooms")
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getRoomById = async (req, res, next) => {
    try {
        // host/api/room?id=room_id
        const room_id = req.query.id;
        const room_rs = await RoomData.getRoomById(room_id);

        //
        console.log("GET - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getRoomByRoomType = async (req, res, next) => {
    try {
        const room_type = req.query.type;
        const room_rs = await RoomData.getRoomByRoomType(room_type);

        //
        console.log("GET - " + config.url + "/api/room?roomtype=" + room_type)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const bookingRoom = async (req, res, next) => {
    try {
        const data = req.body;
        let user = data?.user;
        let bedType = data?.bill?.bedType
        let room = data?.bill?.infoRoom
        let bill = {
            room_ID: room?.ID,
            roomRate: room?.RoomTypes?.prices,
            checkInDay: data?.bill?.checkInDate,
            checkOutDay: data?.bill?.checkOutDate,
            duration: data?.bill?.duration,
            bedType: bedType?.type,
            finalCharge: data?.bill?.finalCharge,
        }

        let exist_bill = await BillData.getBillByRoom_ID(room?.ID);
        if (exist_bill?.length >= 1) {
            let isConflict = false;
            for (const item of exist_bill) {
                console.log(item);
                console.log(data?.bill?.checkInDate, item?.CheckOutDay, item?.Duration, data?.bill?.typeBooking);
                console.log(checkAllowBooking(data?.bill?.checkInDate, item?.CheckOutDay, item?.Duration, data?.bill?.typeBooking));
                console.log(item?.BedType?.trim(), bedType?.name?.trim());
                console.log(data.bill.typeBooking);
                if (
                    item?.BedType?.trim() == bedType?.name?.trim()

                ) {
                    if (!checkAllowBooking(data?.bill?.checkInDate, item?.CheckOutDay, item?.Duration, data?.bill?.typeBooking)) {
                        console.log("Trùng lịch");
                        isConflict = true;
                        break;
                    }
                }
                else {
                    isConflict = false
                }
            }

            if (!isConflict) {
                console.log("Tạo mới do không trùng lịch và trùng thời gian");
                let bill_id = await BillData.createBill(bill);
                let userBookingInfo = {
                    user_id: user.ID,
                    apply_discount_id: data?.bill?.discount?.id ?? null, // Fix here
                    bill_id: bill_id,
                    timeBooking: data?.timeBooking,
                    typePayment: data.bill.typePayment,
                    typeBooking: data.bill.typeBooking,
                    status: data.bill.statusPayment
                };
                console.log(userBookingInfo);
                const room_rs = await UserBookingInfoData.createUserBookingInfo(userBookingInfo);
                console.log(room_rs);
                let isUpdateStatus = await BedTypeData.updateBedType(bedType.id, room.id, 1); // Use await if updateBedType is async
                console.log(isUpdateStatus);
            }
        } else {
            console.log("Tạo mới do chưa đặt phòng nào");
            let bill_id = await BillData.createBill(bill);
            let userBookingInfo = {
                user_id: user.ID,
                apply_discount_id: data?.bill?.discount?.id ?? null, // Fix here
                bill_id: bill_id,
                timeBooking: data?.timeBooking,
                typePayment: data.bill.typePayment,
                typeBooking: data.bill.typeBooking,
                status: data.bill.statusPayment
            };
            console.log(userBookingInfo);
            const room_rs = await UserBookingInfoData.createUserBookingInfo(userBookingInfo);
            console.log(room_rs);
            let isUpdateStatus = await BedTypeData.updateBedType(bedType.id, room.id, 1); // Use await if updateBedType is async
            console.log(isUpdateStatus);
        }
        res.status(200).send("Thanh coong");
    } catch (error) {
        res.status(400).send(error.message)
    }
}


function checkAllowBooking(newCheckin, oldCheckout, duration, type) {
    let newCheckinHourformat, oldCheckoutHourformat, newCheckinformat, oldCheckoutformat
    console.log("----------------------------------/////-/-/-/-/-//--------------------------");
    console.log("newCheckin " + newCheckin);
    console.log("oldCheckout " + oldCheckout);

    if (type.trim() == "hourly") {
        newCheckinHourformat = newCheckin?.trim()?.split(":")[0]
        oldCheckoutHourformat = oldCheckout?.trim()?.split(":")[0]
        console.log("newCheckinHourformat " + newCheckinHourformat);
        console.log("oldCheckoutHourformat " + oldCheckoutHourformat);
        return parseInt(newCheckinHourformat) - parseInt(oldCheckoutHourformat) >= parseInt(duration) + 1
    }
    else if (type.trim() == "overnight") {
        let splitHour1 = newCheckin?.trim()?.split(",")[0]
        let splitHour2 = oldCheckout?.trim()?.split(",")[0]
        let splitDate1 = newCheckin?.trim()?.split(",")[1]
        let splitDate2 = oldCheckout?.trim()?.split(",")[1]

        newCheckinHourformat = parseInt(splitHour1?.trim()?.split(",")[0])
        oldCheckoutHourformat = parseInt(splitHour2?.trim()?.split(",")[0])
        newCheckinformat = parseInt(splitDate1?.trim()?.split("/")[0])
        oldCheckoutformat = parseInt(splitDate2?.trim()?.split("/")[0])
        console.log("newCheckinHourformat " + newCheckinHourformat);
        console.log("oldCheckoutHourformat " + oldCheckoutHourformat);
        console.log("newCheckinformat " + newCheckinformat);
        console.log("oldCheckoutformat " + oldCheckoutformat);
        if (newCheckinformat < oldCheckoutformat) {
            return false
        }
        return true
    }
    else {
        let splitHour1 = newCheckin?.trim()?.split(",")[0]
        let splitHour2 = oldCheckout?.trim()?.split(",")[0]
        let splitDate1 = newCheckin?.trim()?.split(",")[1]
        let splitDate2 = oldCheckout?.trim()?.split(",")[1]

        newCheckinHourformat = parseInt(splitHour1?.trim()?.split(",")[0])
        oldCheckoutHourformat = parseInt(splitHour2?.trim()?.split(",")[0])
        newCheckinformat = parseInt(splitDate1?.trim()?.split("/")[0])
        oldCheckoutformat = parseInt(splitDate2?.trim()?.split("/")[0])
        console.log("newCheckinHourformat " + newCheckinHourformat);
        console.log("oldCheckoutHourformat " + oldCheckoutHourformat);
        console.log("newCheckinformat " + newCheckinformat);
        console.log("oldCheckoutformat " + oldCheckoutformat);
        if (newCheckinformat < oldCheckoutformat) {
            return false
        }
        else {
            if (newCheckinformat == oldCheckoutformat && newCheckinHourformat <= oldCheckoutHourformat) {
                return false
            }
            else {
                return true
            }
        }
    }
}




const getAllMyBooking = async (req, res, next) => {
    try {
        const u_id = req.query.uid
        let bill_rs = [];
        let room_rs = [];
        let results = []
        const userbki_rs = await UserBookingInfoData.getUserBookingInfoByUser_ID(u_id);


        if (userbki_rs?.length >= 1) {
            const billPromises = userbki_rs.map(item => {
                return BillData.getBillByID(item.Bill_ID);
            });

            bill_rs = await Promise.all(billPromises);

            const roomPromises = bill_rs.flat().map(item => {
                return RoomData.getRoomById(item.Room_ID);
            });
            room_rs = await Promise.all(roomPromises);

        }

        userbki_rs.forEach((item, index) => {
            let booking = item
            let bill = bill_rs.flat()[index]
            let room = room_rs.flat().filter(item => {
                return bill.Room_ID == item.ID
            })
            let result = {
                booking: booking,
                bill: bill,
                room: room[0]
            }
            results.push(result)
        })

        res.send(results);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const updateRoom = async (req, res, next) => {
    try {
        const room_id = req.query.id;
        const data = req.body;
        const room_rs = await RoomData.updateRoom(room_id, data)

        //
        console.log("PUT - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        const room_id = req.query.id;
        const room_rs = await RoomData.deleteRoom(room_id)

        //
        console.log("DELETE - " + config.url + "/api/room?id=" + room_id)
        res.send(room_rs);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getAllRoom,
    getRoomList,
    getRoomById,
    getRoomByRoomType,
    getAllMyBooking,
    bookingRoom,
    updateRoom,
}