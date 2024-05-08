UPDATE [RoomType]
SET [Name] = @Name,
    [Maximumcapacity] = @Maximumcapacity,
    [RoomRate] = @RoomRate,
WHERE [ID] = @RoomTypeID;

SELECT * FROM [RoomType] WHERE [ID] = @RoomTypeID;