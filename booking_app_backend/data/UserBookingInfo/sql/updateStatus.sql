UPDATE [UserBookingInfo]
SET [Status] = @Status
WHERE [ID] = @ID;

SELECT * FROM [UserBookingInfo] WHERE [ID] = @ID;
