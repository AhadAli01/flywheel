import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const vehicleSchema = mongoose.Schema(
  {
    //   Seller ID
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    bodyStyle: {
      type: String,
      required: true,
    },
    kms: {
      type: String,
      required: true,
    },
    engineType: {
      type: String,
    },
    transType: {
      type: String,
    },
    powertrain: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Add description attribute??
    // Foreign key
    reviews: [reviewSchema],
    // Average rating
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
