import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Vehicle from '../models/vehicleModel.js';
import User from '../models/userModel.js';

// @desc    Fetch watchlist of individual user
// @route   GET /api/users/:id/watchlist
// @access  Public - should be private (to signed in user) once you implement login/register
// router.get(
//   '/:id/watchlist',
//   asyncHandler(async (req, res) => {
//     const vehicle = await Vehicle.findById(req.params.id);

//     if (vehicle) {
//       res.json(vehicle);
//     } else {
//       res.status(404);
//       throw new Error('Vehicle not found');
//     }
//   })
// );

export default router;
