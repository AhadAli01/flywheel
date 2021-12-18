import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // MongoDB/Mongoose equivalent to instantiating a foreign key in SQL
  },

  name: {
    type: String,
    required: true,
  },

  address: { type: String },

  position: { type: String },

  password: { type: String },

  phone: { type: String },

  officeLoc: { type: String },
});

const Admin = mongoose.model('Admin', adminSchema);
export { Admin };
