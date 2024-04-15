UPDATE [Coupon]
SET [Name] = @Name,
    [AmountDiscount] = @AmountDiscount,
    [PercentDiscount] = @PercentDiscount,
    [EffectiveDate] = @EffectiveDate,
    [ExpirationDate] = @ExpirationDate
WHERE [ID] = @CouponID;

SELECT * FROM [Coupon] WHERE [ID] = @CouponID;