insert into User 
(
  [FullName],
  [Email],
  [CCCD],
  [Gender],
  [PhoneNumber],
  [Birthday]
)
Values
(
  @FullName,
  @Email,
  @CCCD,
  @Gender,
  @PhoneNumber,
  @Birthday
)

SELECT SCOPE_IDENTITY() AS ID;