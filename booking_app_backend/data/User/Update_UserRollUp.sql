UPDATE [User]
SET [LastDayRollUp] = @LastDayRollUp
WHERE [ID] = @UserID;

SELECT * FROM [User] WHERE [ID] = @UserID;