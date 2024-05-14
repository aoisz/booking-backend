INSERT INTO [dbo].[UserCoupon]
           ([CouponID]
           ,[UserID]
           ,[IsUsed]
           ,[NumberOfUses]
           ,[DateScan])
     VALUES
           (@CouponID
           ,@UserID
           ,@IsUsed
           ,@NumberOfUses
           ,@DateScan)

SELECT SCOPE_IDENTITY() AS ID;