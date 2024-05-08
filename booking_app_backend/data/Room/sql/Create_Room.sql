insert into Room 
(
  [RoomType_ID],
  [Status],
  [Name],
  [Note]
)
Values
(
  @RoomType_ID,
  @Status,
  @Name,
  @Note
)

SELECT SCOPE_IDENTITY() AS ID;