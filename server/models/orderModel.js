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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle',
    },
    // Add address later??
    price: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    paidDate: {
      type: String,
      required: true
    },
    deliveryDate: {
      type: String,
      required: true
    }
  },
  {
    //   Paid at Date/Delivery Date
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
