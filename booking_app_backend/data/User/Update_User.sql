UPDATE [User]
SET [FullName] = @FullName,
    [Email] = @Email,
    [CCCD] = @CCCD,
    [Gender] = @Gender,
    [Birthday] = @Birthday
WHERE [ID] = @UserID;

SELECT * FROM [User] WHERE [ID] = @UserID;