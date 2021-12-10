import mongoose from 'mongoose';
import { vehicleSchema } from './vehicleModel.js';
import bcrypt from 'bcryptjs';

// const watchlistSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     // //   Buyer ID
//     // user: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   required: true,
//     //   ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
//     // },
//     vehicles: [vehicleSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },

    phone: { type: String, required: true },

    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const Profile = mongoose.model('Profile', profileSchema);

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
    watchlist: [vehicleSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
