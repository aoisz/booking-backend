select
    r.*,

    rsv.ID as RoomServiceID,
    rsv.Name as RoomServiceName,
    rsv.Surcharge,
    rsv.Room_ID,

    rt.ID as RoomTypeID,
    rt.Name as RoomTypeName,
    rt.Type as RoomType_Type,
    rt.Prices as RoomTypePrices,

    bt.ID as BedTypeID,
    bt.Room_ID as BedTypeRoom_ID,
    bt.Type as BedType_Type,
    bt.Name as BedTypeName,
    bt.Prices as BedTypePrices
 from Room as r
left join RoomType as rt on rt.ID = r.RoomType_ID
right join RoomServices as rsv on rsv.Room_ID = r.ID
left join BedType as bt on bt.Room_ID = r.ID