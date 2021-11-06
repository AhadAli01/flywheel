import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    purchasedVehicle: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle',
      },
    },
    // Add address later??
    orderType: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    fee: {
      type: Number,
      required: true
    },
  },
  {
    //   Paid at Date/Delivery Date
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
