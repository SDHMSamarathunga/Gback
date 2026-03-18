const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Routers
const userRouter = require('./routers/userRouter');
const membershipRouter = require('./routers/membershipRouter');
const paymentRouter = require('./routers/paymentRouter');
const workoutRouter = require('./routers/workoutRouter');

// Routes
app.use('/api/users', userRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/workouts', workoutRouter);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongodb connetion sussfuly ✅');
    })
    .catch((err) => {
        console.error('MongoDB connection error ❌:', err);
    });

// Base Route
app.get('/', (req, res) => {
    res.send('UltraGym Backend is Running! 💪');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
});
