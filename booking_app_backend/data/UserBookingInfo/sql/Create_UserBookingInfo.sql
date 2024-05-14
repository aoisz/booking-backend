insert into UserBookingInfo 
(
  [User_ID],
  [ApplyDiscount_ID],
  [Bill_ID],
  [TimeBooking],
  [TypePayment],
  [TypeBooking],
  [Status]
)
Values
(
  @User_ID,
  @ApplyDiscount_ID,
  @Bill_ID,
  @TimeBooking,
  @TypePayment,
  @TypeBooking,
  @Status
)

SELECT SCOPE_IDENTITY() AS ID;