SELECT SUM(RoomServices.Surcharge) as 'price' FROM RoomServices WHERE RoomServices.Room_ID = @roomId