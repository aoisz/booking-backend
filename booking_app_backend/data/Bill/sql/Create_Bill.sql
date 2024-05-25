insert into Bill 
(
  [Room_ID],
  [RoomRate],
  [CheckInDay],
  [CheckOutDay],
  [Duration],
  [BedType],
  [FinalCharge],
  [BedType_ID]
)
Values
(
  @Room_ID,
  @RoomRate,
  @CheckInDay,
  @CheckOutDay,
  @Duration,
  @BedType,
  @FinalCharge,
  @BedType_ID
)

SELECT SCOPE_IDENTITY() AS ID;