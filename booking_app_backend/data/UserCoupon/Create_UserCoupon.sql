INSERT INTO [dbo].[UserCoupon]
           ([CouponID]
           ,[UserID]
           ,[IsUsed]
           ,[NumberOfUses])
     VALUES
           (@CouponID
           ,@UserID
           ,@IsUsed
           ,@NumberOfUses)

SELECT SCOPE_IDENTITY() AS ID;