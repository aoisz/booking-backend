UPDATE [User]
SET [Point] = @Point
WHERE [ID] = @UserID;

SELECT * FROM [User] WHERE [ID] = @UserID;