UPDATE UserCoupon
SET NumberOfUses = 
    CASE
        WHEN NumberOfUses > 1 THEN NumberOfUses - 1
        ELSE 0
    END,
    IsUsed = 
    CASE
        WHEN NumberOfUses > 1 THEN IsUsed
        ELSE 0
    END
WHERE CouponID = @CouponID
AND UserID = @UserID
AND ID = @UserCouponID;

select UserCoupon.ID, Coupon.Name, Coupon.AmountDiscount, Coupon.PercentDiscount, 
Coupon.EffectiveDate, Coupon.ExpirationDate, UserCoupon.NumberOfUses, UserCoupon.IsUsed from Coupon
inner join UserCoupon on UserCoupon.CouponID = Coupon.ID
where UserCoupon.ID = @UserCouponID