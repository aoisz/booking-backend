insert into HotelInfo 
(
  [Name],
  [Location],
  [PhoneNumber]
)
Values
(
  @Name,
  @Location,
  @PhoneNumber
)

SELECT SCOPE_IDENTITY() AS ID;