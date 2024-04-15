insert into Coupon 
(
  [Name],
  [AmountDiscount],
  [PercentDiscount],
  [EffectiveDate],
  [ExpirationDate]
)
Values
(
  @Name,
  @AmountDiscount,
  @PercentDiscount,
  @EffectiveDate,
  @ExpirationDate
)

SELECT SCOPE_IDENTITY() AS ID;