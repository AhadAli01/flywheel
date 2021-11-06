import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

// Config
dotenv.config();
connectDB();
const app = express();

// Default API route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Vehicle Routes
app.use('/api/vehicles', vehicleRoutes);

// Middleware - check for errors
app.use(notFound);
app.use(errorHandler);

// Run the API
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
