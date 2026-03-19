const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());

const dbconnection = require('./src/Utils/DBConnection');
dbconnection();

const userRoutes = require('./src/Routes/UserRoutes');
app.use('/user',userRoutes);

const serviceRoutes= require("./src/Routes/ServiceRoutes");
app.use('/services',serviceRoutes)

const bookingRoutes= require("./src/Routes/BookingRoutes");
app.use('/bookings',bookingRoutes)

const reviewRoutes= require("./src/Routes/ReviewRoutes");
app.use('/reviews',reviewRoutes)

const paymentRoutes= require("./src/Routes/PaymentRoutes");
app.use('/payments',paymentRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})