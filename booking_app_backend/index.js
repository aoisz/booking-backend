'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');

const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes')
const accountRoutes = require('./routes/AccountRoutes')
const billRoutes = require('./routes/BillRoutes')
const couponRoutes = require('./routes/CouponRoutes')
const usercouponRoutes = require('./routes/UserCouponRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', accountRoutes.routes)
app.use('/api', billRoutes.routes)
app.use('/api', couponRoutes.routes)
app.use('/api', usercouponRoutes.routes)

app.listen(config.port, () => {
  console.log('Server is listening on ' + config.url)
})