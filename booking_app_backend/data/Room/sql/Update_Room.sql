UPDATE [Room]
SET [RoomType_ID] = @RoomType_ID,
    [Status] = @Status,
    [Name] = @Name,
    [Note] = @Note,
WHERE [ID] = @RoomID;

SELECT * FROM [Room] WHERE [ID] = @RoomID;