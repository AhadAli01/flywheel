import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import vehicles from './data/vehicles.js';
import { User } from './models/userModel.js';
import Vehicle from './models/vehicleModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Vehicle.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleVehicles = vehicles.map((vehicle) => {
      return { ...vehicle, user: adminUser };
    });
    await Vehicle.insertMany(sampleVehicles);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Vehicle.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
