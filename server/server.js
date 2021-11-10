import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import userRoutes from './routes/userRoutes.js';

// !MAKE SURE YOU GUYS GIT PULL BEFORE AND AFTER EVERYTIME YOU MAKE A CHANGE

// Config
dotenv.config();
connectDB();
const app = express();

// Default API route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json());

// Vehicle Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);

// Middleware - check for errors
app.use(notFound);
app.use(errorHandler);

// Run the API
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
