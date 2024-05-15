UPDATE [BedType]
SET [Status] = @Status
WHERE [ID] = @ID AND [Room_ID] = @Room_ID;

SELECT * FROM [BedType] WHERE [ID] = @ID;
