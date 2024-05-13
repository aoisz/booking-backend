'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');

const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes')
const billRoutes = require('./routes/BillRoutes')
const couponRoutes = require('./routes/CouponRoutes')
const usercouponRoutes = require('./routes/UserCouponRoutes')
const userRoutes = require('./routes/UserRoutes');
const roomTypeRoutes = require('./routes/RoomTypeRoutes');
const roomRoutes = require('./routes/RoomRoutes')
const hotelRoutes = require('./routes/HotelInfoRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', billRoutes.routes)
app.use('/api', couponRoutes.routes)
app.use('/api', usercouponRoutes.routes)
app.use('/api', userRoutes.routes)
app.use('/api', roomTypeRoutes.routes)
app.use('/api', roomRoutes.routes)
app.use('/api', roomTypeRoutes.routes)
app.use('/api', hotelRoutes.routes)
app.use('/api', userRoutes.routes)



app.listen(config.port, () => {
  console.log('Server is listening on ' + config.url)
})