select
    r.*,

    rsv.ID as RoomServiceID,
    rsv.Name as RoomServiceName,
    rsv.Surcharge,
    rsv.Room_ID,

    rt.ID as RoomTypeID,
    rt.Name as RoomTypeName,

    bt.ID as BedTypeID,
    bt.RoomType_ID,
    bt.Name as BedTypeName,
    bt.RoomRate
 from Room as r
left join RoomType as rt on rt.ID = r.RoomType_ID
left join RoomServices as rsv on rsv.Room_ID = r.ID
left join BedType as bt on bt.RoomType_ID = rt.ID
where r.ID = @RoomID