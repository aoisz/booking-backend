SELECT *
FROM RoomType
WHERE Maximumcapacity = @capacity AND RoomRate > @minPrice AND RoomRate < @maxPrice
