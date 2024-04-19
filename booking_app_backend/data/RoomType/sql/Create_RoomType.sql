insert into RoomType 
(
  [Name],
  [Maximumcapacity],
  [RoomRate]
)
Values
(
  @Name,
  @Maximumcapacity,
  @RoomRate
)

SELECT SCOPE_IDENTITY() AS ID;