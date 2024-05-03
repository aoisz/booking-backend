UPDATE [HotelInfo]
SET [Name] = @Name,
    [Location] = @Location,
    [PhoneNumber] = @PhoneNumber,
WHERE [ID] = @HotelID;

SELECT * FROM [HotelInfo] WHERE [ID] = @HotelID;