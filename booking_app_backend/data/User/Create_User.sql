IF NOT EXISTS (SELECT 1 FROM [User] WHERE [PhoneNumber] = @PhoneNumber)
BEGIN
    -- Chèn thông tin người dùng mới vào cơ sở dữ liệu vì PhoneNumber không tồn tại
    INSERT INTO [User]  
    ( 
        [FullName], 
        [Email], 
        [CCCD], 
        [Gender], 
        [PhoneNumber], 
        [Birthday] 
    ) 
    VALUES 
    ( 
        @FullName, 
        @Email, 
        @CCCD, 
        @Gender, 
        @PhoneNumber, 
        @Birthday 
    ) 
    
    -- Trả về ID của bản ghi vừa được chèn
    SELECT SCOPE_IDENTITY() AS ID;
END
