import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://julis:password@monguito:27017/restaurant-api?authSource=admin')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api', restaurantRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
