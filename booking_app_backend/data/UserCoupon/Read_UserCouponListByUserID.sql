select UserCoupon.ID, Coupon.Name, Coupon.AmountDiscount, Coupon.PercentDiscount, 
Coupon.EffectiveDate, Coupon.ExpirationDate, UserCoupon.NumberOfUses, UserCoupon.IsUsed from Coupon
inner join UserCoupon on UserCoupon.CouponID = Coupon.ID
where UserCoupon.UserID = @user_id
and UserCoupon.IsUsed = 1