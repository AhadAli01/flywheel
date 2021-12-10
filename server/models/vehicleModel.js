import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    //writer: { type: String, required: true },
    //rating: { type: Number, required: false },
    content: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'User',
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  },
  {
    timestamps: true,
  }
);

export const auctionSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    bidPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    postedDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    isSold: {
      type: Boolean,
      required: true,
      default: false,
    },
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
    comments: [commentSchema],
    // Average rating
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numComments: {
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

const truckSchema = mongoose.Schema(
  {
    //   VIN
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    towCapacity: { type: Number, required: true },
    bedWeightCapacity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const suvSchema = mongoose.Schema(
  {
    //   VIN
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    trunkSize: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const vanSchema = mongoose.Schema(
  {
    //   VIN
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    noOfSeats: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const sedanSchema = mongoose.Schema(
  {
    //   VIN
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
    },
    noOfDoors: { type: Number, required: true },
    length: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const Auction = mongoose.model('Auction', auctionSchema);
const Comment = mongoose.model('Comment',commentSchema);
const Sedan = mongoose.model('Sedan', sedanSchema);
const Suv = mongoose.model('Suv', suvSchema);
const Van = mongoose.model('Van', vanSchema);
const Truck = mongoose.model('Truck', truckSchema);

export { Auction, Vehicle, Sedan, Suv, Van, Truck, Comment };
