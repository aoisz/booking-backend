SELECT * 
FROM RoomType
WHERE RoomRate > @minPrice AND RoomRate < @maxPrice