import mongoose from 'mongoose';
import { vehicleSchema } from './vehicleModel.js';

const watchlistSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    //   Buyer ID
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    vehicles: [vehicleSchema],
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    watchlist: watchlistSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
