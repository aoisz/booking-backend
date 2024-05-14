insert into Bill 
(
  [Room_ID],
  [RoomRate],
  [CheckInDay],
  [CheckOutDay],
  [Duration],
  [BedType],
  [FinalCharge]
)
Values
(
  @Room_ID,
  @RoomRate,
  @CheckInDay,
  @CheckOutDay,
  @Duration,
  @BedType,
  @FinalCharge
)

SELECT SCOPE_IDENTITY() AS ID;